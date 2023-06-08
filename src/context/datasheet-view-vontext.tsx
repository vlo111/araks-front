import { Drawer, Image, Space } from 'antd';
import DOMPurify from 'dompurify';
import * as React from 'react';
import { NodeDataResponse, NodeDataType, NodeDataTypes, NodePropertiesValues, ResponseLocationType } from 'types/node';
import { useOverview } from './overview-context';
import { Text, MenuText } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { COLORS } from 'helpers/constants';
import { Button } from 'components/button';
import { PropertyTypes } from 'components/form/property/types';
import dayjs from 'dayjs';
import { CalendarOutlined, EnvironmentOutlined, LinkOutlined } from '@ant-design/icons';

type VIewDataType = NodeDataResponse | undefined;

type Dispatch = React.Dispatch<React.SetStateAction<VIewDataType>>;
type ViewDatasheetProviderProps = { children: React.ReactNode };

const ViewDatasheetContext = React.createContext<{ state: VIewDataType; dispatch: Dispatch } | undefined>(undefined);

const getSingleData = (nodeData: NodeDataTypes | undefined) => {
  if (!nodeData) {
    return '';
  }
  if (typeof nodeData[0] === 'string') {
    return nodeData.join('');
  } else {
    return (nodeData[0] as ResponseLocationType)?.address;
  }
};

const dataByType = (nodeData: NodeDataType, propertyType: PropertyTypes) => {
  let text: string;
  if (typeof nodeData === 'string') {
    text = nodeData;
  } else {
    text = nodeData?.address;
  }

  const sanitizedHTML = DOMPurify.sanitize(text);

  switch (propertyType) {
    case PropertyTypes.IMAGE_URL:
      return <Image src={text} width={200} />;
    case PropertyTypes.Document:
    case PropertyTypes.URL:
      return (
        <Button type="link" href={text} target="_blank" icon={<LinkOutlined />}>
          {text}
        </Button>
      );
    case PropertyTypes.Location:
      return (
        <Space>
          <EnvironmentOutlined />
          <span>{text}</span>
        </Space>
      );
    case PropertyTypes.RichText:
      return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
    case PropertyTypes.Date:
      return (
        <Space>
          <CalendarOutlined /> <span>{dayjs(text).format('YYYY-MM-DD')}</span>
        </Space>
      );
    case PropertyTypes.DateTime:
      return (
        <Space>
          <CalendarOutlined /> <span>{dayjs(text).format('YYYY-MM-DD HH:mm')}</span>
        </Space>
      );
    case PropertyTypes.Boolean:
      return text === 'true' ? 'Yes' : 'No';
    case PropertyTypes.Text:
      return <span>{text}</span>;
    default:
      return text;
  }
};

const getRowData = (item: NodePropertiesValues) => {
  if (!item?.nodes_data) {
    return '';
  }
  const isMultiple = item.nodes_data && item.nodes_data.length > 1;
  switch (item.project_type_property_name) {
    case PropertyTypes.IMAGE_URL:
      return (
        <Image.PreviewGroup>
          <Space>
            {isMultiple
              ? item.nodes_data.map((data) => dataByType(data, PropertyTypes.IMAGE_URL))
              : dataByType(getSingleData(item.nodes_data), PropertyTypes.IMAGE_URL)}
          </Space>
        </Image.PreviewGroup>
      );
    case PropertyTypes.Document:
    case PropertyTypes.URL:
      return isMultiple ? (
        <Space>{item.nodes_data.map((data) => dataByType(data, PropertyTypes.URL))}</Space>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.URL)
      );
    case PropertyTypes.Location:
      return isMultiple ? (
        <Space>{item.nodes_data.map((data) => dataByType(data, PropertyTypes.Location))}</Space>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Location)
      );
    case PropertyTypes.RichText:
      return dataByType(getSingleData(item.nodes_data), PropertyTypes.RichText);
    case PropertyTypes.Date:
      return isMultiple ? (
        <Space>{item.nodes_data.map((data) => dataByType(data, PropertyTypes.Date))}</Space>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Date)
      );
    case PropertyTypes.DateTime:
      return isMultiple ? (
        <Space>{item.nodes_data.map((data) => dataByType(data, PropertyTypes.DateTime))}</Space>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.DateTime)
      );
    case PropertyTypes.Boolean:
      return isMultiple ? (
        <Space>{item.nodes_data.map((data) => dataByType(data, PropertyTypes.Boolean))}</Space>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Boolean)
      );
    case PropertyTypes.Text:
      return isMultiple ? (
        <Space>{item.nodes_data.map((data) => dataByType(data, PropertyTypes.Text))}</Space>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Text)
      );
    default:
      return getSingleData(item.nodes_data);
  }
};

function ViewDatasheetProvider({ children }: ViewDatasheetProviderProps) {
  const { state } = useOverview();
  const [selectedView, setSelectedView] = React.useState<VIewDataType>();
  const value = React.useMemo(() => ({ state: selectedView, dispatch: setSelectedView }), [selectedView]);

  const onClose = () => {
    setSelectedView(undefined);
  };
  return (
    <ViewDatasheetContext.Provider value={value}>
      {children}
      <Drawer
        title={
          <>
            <MenuText strong>{state}</MenuText>
            {' / '}
            <Text></Text>
          </>
        }
        mask={false}
        placement="top"
        closable={false}
        onClose={onClose}
        afterOpenChange={(open) => {
          !open && setSelectedView(undefined);
        }}
        open={!!selectedView}
        getContainer={false}
        footer={false}
        contentWrapperStyle={{ marginLeft: '250px', height: '100%' }}
      >
        <VerticalSpace>
          {selectedView?.properties ? (
            selectedView.properties.map((data) => {
              return (
                <VerticalSpace key={data.id}>
                  <Text color={COLORS.PRIMARY.BLUE}>{data.nodeType.name}</Text>
                  {getRowData(data)}
                </VerticalSpace>
              );
            })
          ) : (
            <></>
          )}
        </VerticalSpace>
      </Drawer>
    </ViewDatasheetContext.Provider>
  );
}

function useViewDatasheet() {
  const context = React.useContext(ViewDatasheetContext);
  if (context === undefined) {
    throw new Error('useViewDatasheet must be used within a ViewDatasheetProvider');
  }
  return context;
}

export { ViewDatasheetProvider, useViewDatasheet };
