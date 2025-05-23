import { CalendarOutlined, DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Image, Row, Space, UploadFile } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { DocumentViewDrawer } from 'components/drawer/document-view-drawer';
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
import { Fragment } from 'react';
import {
  NodeBody,
  NodeDataResponse,
  NodeDataType,
  NodeDataTypes,
  NodeEdges,
  NodeEdgesGrouped,
  NodePropertiesValues,
  ResponseLocationType,
  UploadedFileType,
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
    // case PropertyTypes.IMAGE_URL:
    //   return <Avatar src={text} />;
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
  switch (true) {
    case item.project_type_property_type === PropertyTypes.ENUM: {
      const {
        nodeTypeProperty: { enums_data },
      } = item;

      return (
        <ManageNodeTypePopover
          trigger="hover"
          content={enums_data
            .filter((d) => item.nodes_data?.includes(d.id))
            .map((a) => a.name)
            .join(', ')}
        >{`${item.nodes_data?.length} records`}</ManageNodeTypePopover>
      );
    }
    case item.nodes_data && item.nodes_data.length > 1:
      return (
        <ManageNodeTypePopover
          trigger="hover"
          content={
            item.project_type_property_type === PropertyTypes.Document ? (
              <VerticalSpace>
                {item.nodes_data?.map((node) => {
                  return node ? (
                    <Button
                      type="link"
                      href={`${process.env.REACT_APP_AWS_URL}${(node as UploadedFileType).url}`}
                      target="_blank"
                      key={(node as UploadedFileType).url}
                      icon={<DownloadOutlined />}
                    >
                      {(node as UploadedFileType).name}
                    </Button>
                  ) : (
                    ''
                  );
                })}
              </VerticalSpace>
            ) : item.project_type_property_type === PropertyTypes.IMAGE_URL ? (
              <Space>
                {item.nodes_data?.map((node) => {
                  return node ? (
                    <Avatar src={node ? `${process.env.REACT_APP_AWS_URL}${node}` : ''} key={node as string} />
                  ) : (
                    ''
                  );
                })}
              </Space>
            ) : (
              <VerticalSpace>
                {item.nodes_data?.map((node) => {
                  return (node as ResponseLocationType).address
                    ? (node as ResponseLocationType).address
                    : node
                    ? showText(item.project_type_property_type as PropertyTypes, node as string)
                    : '';
                })}
              </VerticalSpace>
            )
          }
        >{`${item.nodes_data?.length} records`}</ManageNodeTypePopover>
      );
    case item.project_type_property_type === PropertyTypes.IMAGE_URL:
      return (
        <Space>
          {item.nodes_data?.map((node) => {
            return node ? (
              <Avatar src={node ? `${process.env.REACT_APP_AWS_URL}${node}` : ''} key={node as string} />
            ) : (
              ''
            );
          })}
        </Space>
      );
    case item.project_type_property_type === PropertyTypes.Document:
      return (
        <Space>
          {item.nodes_data?.map((node) => {
            return node ? (
              <Button
                type="link"
                href={`${process.env.REACT_APP_AWS_URL}${(node as UploadedFileType).url}`}
                target="_blank"
                key={(node as UploadedFileType).url}
              >
                <LongTitle
                  style={{ maxWidth: '500px' }}
                  className="button-content__text"
                  name={(node as UploadedFileType).name as string}
                />
              </Button>
            ) : (
              ''
            );
          })}
        </Space>
      );
    case showTextCondition(
      item.project_type_property_type as PropertyTypes,
      (item.nodes_data?.[0] as ResponseLocationType)?.address
        ? (item.nodes_data?.[0] as ResponseLocationType).address
        : (item.nodes_data?.filter(Boolean)?.join('') as string)
    ):
      return (item.nodes_data?.[0] as ResponseLocationType)?.address
        ? (item.nodes_data?.[0] as ResponseLocationType).address
        : showText(
            item.project_type_property_type as PropertyTypes,
            item.nodes_data
              ?.join('')
              .replace(/<[^>]+>/g, '')
              .replace(/&nbsp;/g, ' ') as string,
            item,
            row
          );
    default:
      return (
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUploadFileType(obj: unknown): obj is UploadedFileType {
  return (obj as UploadedFileType)?.url !== undefined;
}

const dataByType = (nodeData: NodeDataType, propertyType: PropertyTypes) => {
  let text;

  if (typeof nodeData === 'string' || typeof nodeData === 'number' || typeof nodeData === 'boolean') {
    text = nodeData as string;
  } else if (isUploadFileType(nodeData)) {
    /** @TODO @deprecated remove this section  */
    return (
      <Button
        type="link"
        href={`${process.env.REACT_APP_AWS_URL}${nodeData.url}`}
        target="_blank"
        icon={<LinkOutlined key={nodeData.url} />}
      >
        <Text color={COLORS.PRIMARY.GRAY_DARK}>{nodeData.name}</Text>
      </Button>
    );
  } else {
    text = nodeData?.address;
  }

  if (!text) {
    return <Text color={COLORS.PRIMARY.GRAY}>(No Value)</Text>;
  }

  switch (propertyType) {
    case PropertyTypes.IMAGE_URL:
      return (
        <Image
          src={`${process.env.REACT_APP_AWS_URL}${text}`}
          width={161}
          height={127}
          style={{ borderRadius: '4px', ...centerImageStyle }}
        />
      );
    // case PropertyTypes.Document:
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
/** Show data in view page for each property */
export const getRowData = (item: NodePropertiesValues) => {
  if (!item?.nodes_data) {
    return '';
  }
  const isMultiple = item.nodes_data && item.nodes_data.length > 1;

  switch (item.project_type_property_type) {
    case PropertyTypes.IMAGE_URL:
      return (
        <Image.PreviewGroup>
          <Space>
            {isMultiple
              ? item.nodes_data.map((data, index) => (
                  <Fragment key={index}>{dataByType(data, PropertyTypes.IMAGE_URL)}</Fragment>
                ))
              : dataByType(getSingleData(item.nodes_data), PropertyTypes.IMAGE_URL)}
          </Space>
        </Image.PreviewGroup>
      );
    case PropertyTypes.Document:
      return <DocumentViewDrawer items={item.nodes_data} />;
    case PropertyTypes.URL:
      return isMultiple ? (
        <Row gutter={[10, 10]} style={{ display: 'flex', flexDirection: 'column' }}>
          {item.nodes_data.map((data, index) => (
            <Col xs={12} lg={6} key={index}>
              {dataByType(data, PropertyTypes.URL)}
            </Col>
          ))}
        </Row>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.URL)
      );
    case PropertyTypes.Location:
      return (
        <Row gutter={[10, 10]} style={{ display: 'flex', flexDirection: 'column' }}>
          {item.nodes_data.map((data, index) => (
            <Col xs={12} lg={6} key={index}>
              {dataByType(data, PropertyTypes.Location)}
            </Col>
          ))}
        </Row>
      );

    case PropertyTypes.RichText:
      return dataByType(getSingleData(item.nodes_data), PropertyTypes.RichText);
    case PropertyTypes.Date:
      return isMultiple ? (
        <Row gutter={[10, 10]}>
          {item.nodes_data.map((data, index) => (
            <Col xs={12} lg={6} key={index}>
              {dataByType(data, PropertyTypes.Date)}
            </Col>
          ))}
        </Row>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Date)
      );
    case PropertyTypes.DateTime:
      return isMultiple ? (
        <Row gutter={[10, 10]}>
          {item.nodes_data.map((data, index) => (
            <Col xs={12} lg={6} key={index}>
              {dataByType(data, PropertyTypes.DateTime)}
            </Col>
          ))}
        </Row>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.DateTime)
      );
    case PropertyTypes.Boolean: {
      return isMultiple ? (
        <Row gutter={[10, 10]}>
          {item.nodes_data.map((data, index) => (
            <Col xs={12} lg={6} key={index}>
              {dataByType(data, PropertyTypes.Boolean)}
            </Col>
          ))}
        </Row>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Boolean)
      );
    }
    case PropertyTypes.Text:
      return isMultiple ? (
        <Row gutter={[10, 10]}>
          {item.nodes_data.map((data, index) => (
            <Col xs={12} lg={6} key={index}>
              {dataByType(data, PropertyTypes.Text)}
            </Col>
          ))}
        </Row>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Text)
      );
    case PropertyTypes.Integer:
    case PropertyTypes.Decimal:
      return isMultiple ? (
        <Row gutter={[10, 10]}>
          {item.nodes_data.map((data, index) => (
            <Col xs={12} lg={6} key={index}>
              {dataByType(data, PropertyTypes.Text)}
            </Col>
          ))}
        </Row>
      ) : (
        dataByType(getSingleData(item.nodes_data), PropertyTypes.Text)
      );
    case PropertyTypes.ENUM:
      const {
        nodes_data,
        nodeTypeProperty: { enums_data },
      } = item;

      return (
        <Text color={COLORS.PRIMARY.GRAY_DARK}>
          {enums_data
            .filter((d) => nodes_data?.includes(d.id))
            .map((a) => a.name)
            .join(', ')}
        </Text>
      );
    default:
      return getSingleData(item.nodes_data);
  }
};

/** set data for submit when create node, is similar with setNodeDataUpdateValue  */
export const setNodeDataValue = (item: ProjectTypePropertyReturnData, values: NodeBody) => {
  if (!values[item.name]) {
    return [];
  }
  if (item.ref_property_type_id === PropertyTypes.Location) {
    return (values[item.name] as Location[]).map((item) => getLocation(item)).filter(Boolean);
  }
  if (item.ref_property_type_id === PropertyTypes.Document) {
    return (values[item.name] as UploadFile[]).map((item) => ({
      name: item?.response?.data.originalFileName,
      url: item?.response?.data.uploadPath,
    }));
  }
  if (item.ref_property_type_id === PropertyTypes.IMAGE_URL) {
    return (values[item.name] as UploadFile[]).map((item) => item?.response?.data.uploadPath);
  }
  if (Array.isArray(values[item.name])) {
    return (values[item.name] as unknown[])?.filter((item) => item !== undefined && item !== null);
  }

  return values[item.name];
};

/** set property value when updateing, is similar with setNodeDataValue function */
export const setNodeDataUpdateValue = (item: NodePropertiesValues, values: NodeBody) => {
  if (!values[item.nodeTypeProperty.name]) {
    return [];
  }
  if (item.project_type_property_type === PropertyTypes.Location) {
    return (values[item.nodeTypeProperty.name] as Location[]).map((item) => getLocation(item)).filter(Boolean);
  }
  if (item.project_type_property_type === PropertyTypes.Document) {
    return (values[item.nodeTypeProperty.name] as UploadFile[]).map((item) => ({
      name: item?.response?.data.originalFileName,
      url: item?.response?.data.uploadPath,
    }));
  }
  if (item.project_type_property_type === PropertyTypes.IMAGE_URL) {
    return (values[item.nodeTypeProperty.name] as UploadFile[]).map((item) => item?.response?.data.uploadPath);
  }
  if (Array.isArray(values[item.nodeTypeProperty.name])) {
    return (values[item.nodeTypeProperty.name] as unknown[])?.filter(
      (item) => item !== undefined && item !== null && item !== ''
    );
  }

  return values[item.nodeTypeProperty.name];
};
