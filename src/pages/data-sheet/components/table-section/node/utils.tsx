import { CalendarOutlined, LinkOutlined } from '@ant-design/icons';
import { Avatar, Button, Image, Space } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { PropertyTypes } from 'components/form/property/types';
import { getConnectionFormName } from 'components/form/type/connection-type';
import { LocationView } from 'components/location/location-view';
import { Location } from 'components/modal/types';
import { ManageNodeTypePopover } from 'components/popover';
import { VerticalSpace } from 'components/space/vertical-space';
import { LongTitle, Text } from 'components/typography';
import { ShowSafeText } from 'components/typography/show-safe-text';
import dayjs from 'dayjs';
import { centerImageStyle, COLORS } from 'helpers/constants';
import {
  NodeBody,
  NodeDataResponse,
  NodeDataType,
  NodeDataTypes,
  NodeEdges,
  NodeEdgesGrouped,
  NodePropertiesValues,
  ResponseLocationType,
} from 'types/node';
import { NodeViewButton } from './node-view-button';

export function getLocation(locationValue: Location) {
  if (!locationValue?.address) {
    return null;
  }
  return {
    location: {
      latitude: locationValue.lat,
      longitude: locationValue.lng,
    },
    address: locationValue.address,
  };
}

const showTextCondition = (propertyType: PropertyTypes, text: string) =>
  [
    PropertyTypes.Integer,
    PropertyTypes.Decimal,
    PropertyTypes.Date,
    PropertyTypes.DateTime,
    PropertyTypes.Boolean,
  ].includes(propertyType) ||
  !text ||
  text.length < 30;

const showText = (
  propertyType: PropertyTypes,
  text: string,
  col?: NodePropertiesValues,
  rowData?: NodeDataResponse
) => {
  if (!text) {
    return text;
  }
  switch (propertyType) {
    case PropertyTypes.IMAGE_URL:
      return <Avatar src={text} />;
    case PropertyTypes.Document:
    case PropertyTypes.URL:
      return (
        <Button type="link" href={text} target="_blank">
          {text}
        </Button>
      );
    case PropertyTypes.RichText:
      return text.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
    case PropertyTypes.Date:
      return dayjs(text).format('YYYY-MM-DD');
    case PropertyTypes.DateTime:
      return dayjs(text).format('YYYY-MM-DD HH:mm');
    case PropertyTypes.Boolean:
      return text === 'true' ? 'Yes' : 'No';
    case PropertyTypes.Text:
      // @deprecated this might not be used
      return col?.nodeTypeProperty.default_property ? <NodeViewButton text={text} rowData={rowData} /> : text;
    default:
      return text;
  }
};

export function showAvatar(imageUrl: string) {
  return <Avatar src={imageUrl} size="large" />;
}

/** Get grid column value for non connection type */
export function getColumnValue(item: NodePropertiesValues, row: NodeDataResponse) {
  return item.nodes_data && item.nodes_data.length > 1 ? (
    <ManageNodeTypePopover
      trigger="hover"
      content={
        item.project_type_property_type === PropertyTypes.IMAGE_URL ? (
          <Space>
            {item.nodes_data.map((node) => {
              return node ? showText(item.project_type_property_type as PropertyTypes, node as string) : '';
            })}
          </Space>
        ) : (
          <VerticalSpace>
            {item.nodes_data.map((node) => {
              return (node as ResponseLocationType).address
                ? (node as ResponseLocationType).address
                : node
                ? showText(item.project_type_property_type as PropertyTypes, node as string)
                : '';
            })}
          </VerticalSpace>
        )
      }
    >{`${item.nodes_data.length} records`}</ManageNodeTypePopover>
  ) : showTextCondition(
      item.project_type_property_type as PropertyTypes,
      (item.nodes_data?.[0] as ResponseLocationType)?.address
        ? (item.nodes_data?.[0] as ResponseLocationType).address
        : (item.nodes_data?.filter(Boolean)?.join('') as string)
    ) ? (
    (item.nodes_data?.[0] as ResponseLocationType)?.address ? (
      (item.nodes_data?.[0] as ResponseLocationType).address
    ) : (
      showText(
        item.project_type_property_type as PropertyTypes,
        item.nodes_data
          ?.join('')
          .replace(/<[^>]+>/g, '')
          .replace(/&nbsp;/g, ' ') as string,
        item,
        row
      )
    )
  ) : item.project_type_property_type === PropertyTypes.IMAGE_URL ? (
    <Avatar src={item.nodes_data?.join('') as string} size="large" />
  ) : (
    <LongTitle
      style={{ maxWidth: '500px' }}
      className="button-content__text"
      name={
        (item.nodes_data?.[0] as ResponseLocationType)?.address
          ? (item.nodes_data?.[0] as ResponseLocationType).address
          : (item.nodes_data
              ?.join('')
              .replace(/<[^>]+>/g, '')
              .replace(/&nbsp;/g, ' ') as string)
      }
      titleContent={
        (item.nodes_data?.[0] as ResponseLocationType)?.address
          ? (item.nodes_data?.[0] as ResponseLocationType).address
          : showText(item.project_type_property_type as PropertyTypes, item.nodes_data?.join('') as string)
      }
    />
  );
}

/**
 * this is for grouping edges based on their column name
 * @param data
 * @returns NodeEdges grouped by name
 */
export const groupedData = (data: NodeEdges[]) =>
  data.reduce((result, item) => {
    const edgeTypeName = getConnectionFormName(item.edgeTypes.name, item.edgeTypes.id);

    if (!result[edgeTypeName]) {
      result[edgeTypeName] = [];
    }

    result[edgeTypeName].push(item);

    return result;
  }, {} as NodeEdgesGrouped);

export const getSingleData = (nodeData: NodeDataTypes | undefined) => {
  if (!nodeData) {
    return '';
  }
  if (typeof nodeData[0] === 'string' || typeof nodeData[0] === 'number' || typeof nodeData[0] === 'boolean') {
    return nodeData.join('');
  } else {
    return (nodeData[0] as ResponseLocationType)?.address;
  }
};

const dataByType = (nodeData: NodeDataType, propertyType: PropertyTypes) => {
  let text;

  if (typeof nodeData === 'string' || typeof nodeData === 'number' || typeof nodeData === 'boolean') {
    text = nodeData as string;
  } else {
    text = nodeData?.address;
  }

  if (!text) {
    return <Text color={COLORS.PRIMARY.GRAY}>(No Value)</Text>;
  }

  switch (propertyType) {
    case PropertyTypes.IMAGE_URL:
      return <Image src={text} width={161} height={127} style={{ borderRadius: '4px', ...centerImageStyle }} />;
    case PropertyTypes.Document:
    case PropertyTypes.URL:
      return (
        <Button type="link" href={text} target="_blank" icon={<LinkOutlined />}>
          <Text color={COLORS.PRIMARY.GRAY_DARK}>{text}</Text>
        </Button>
      );
    case PropertyTypes.Location:
      return <LocationView text={text} location={nodeData as ResponseLocationType} />;
    case PropertyTypes.RichText:
      return <ShowSafeText text={text} />;
    case PropertyTypes.Date:
      return (
        <Space>
          <CalendarOutlined /> <Text color={COLORS.PRIMARY.GRAY_DARK}>{dayjs(text).format('YYYY-MM-DD')}</Text>
        </Space>
      );
    case PropertyTypes.DateTime:
      return (
        <Space>
          <CalendarOutlined /> <Text color={COLORS.PRIMARY.GRAY_DARK}>{dayjs(text).format('YYYY-MM-DD HH:mm')}</Text>
        </Space>
      );
    case PropertyTypes.Boolean:
      return <Text color={COLORS.PRIMARY.GRAY_DARK}>{text === 'true' ? 'Yes' : 'No'}</Text>;
    case PropertyTypes.Text:
    case PropertyTypes.Integer:
    case PropertyTypes.Decimal:
      return <Text color={COLORS.PRIMARY.GRAY_DARK}>{text}</Text>;
    default:
      return <Text color={COLORS.PRIMARY.GRAY_DARK}>{text}</Text>;
  }
};

export const getRowData = (item: NodePropertiesValues) => {
  if (!item?.nodes_data) {
    return '';
  }
  const isMultiple = item.nodes_data && item.nodes_data.length > 1;

  //   if (item.nodeTypeProperty.default_image) {
  //     return <Avatar src={dataByType(getSingleData(item.nodes_data), PropertyTypes.IMAGE_URL)} />;
  //   }

  switch (item.project_type_property_type) {
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
      return <Space>{item?.nodes_data?.map((data) => dataByType(data, PropertyTypes.Location))}</Space>;

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
    case PropertyTypes.Boolean: {
      return isMultiple ? (
        <Space>{item.nodes_data.map((data) => dataByType(data, PropertyTypes.Boolean))}</Space>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Boolean)
      );
    }
    case PropertyTypes.Text:
      return isMultiple ? (
        <Space>{item.nodes_data.map((data) => dataByType(data, PropertyTypes.Text))}</Space>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Text)
      );
    case PropertyTypes.Integer:
    case PropertyTypes.Decimal:
      return isMultiple ? (
        <Space>{item.nodes_data.map((data) => dataByType(data, PropertyTypes.Text))}</Space>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Text)
      );
    default:
      return getSingleData(item.nodes_data);
  }
};

export const setNodeDataValue = (item: ProjectTypePropertyReturnData, values: NodeBody) => {
  if (!values[item.name]) {
    return null;
  }
  if (item.ref_property_type_id === PropertyTypes.Location) {
    return (values[item.name] as Location[]).map((item) => getLocation(item)).filter(Boolean);
  }
  if (Array.isArray(values[item.name])) {
    // if (item.ref_property_type_id === PropertyTypes.Date) {
    //   return (values[item.name] as unknown[]).map((rec) => dayjs(rec as string).format('DD-MM-YYYY'));
    // }
    return (values[item.name] as unknown[])?.filter(Boolean);
  }

  return values[item.name];
};

export const setNodeDataUpdateValue = (item: NodePropertiesValues, values: NodeBody) => {
  if (!values[item.nodeTypeProperty.name]) {
    return null;
  }
  if (item.project_type_property_type === PropertyTypes.Location) {
    return (values[item.nodeTypeProperty.name] as Location[]).map((item) => getLocation(item)).filter(Boolean);
  }
  if (Array.isArray(values[item.nodeTypeProperty.name])) {
    // if (item.ref_property_type_id === PropertyTypes.Date) {
    //   return (values[item.name] as unknown[]).map((rec) => dayjs(rec as string).format('DD-MM-YYYY'));
    // }
    return (values[item.nodeTypeProperty.name] as unknown[])?.filter(Boolean);
  }

  return values[item.nodeTypeProperty.name];
};
