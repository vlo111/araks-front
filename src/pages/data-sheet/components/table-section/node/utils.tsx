import { Avatar, Button, Space } from 'antd';
import { PropertyTypes } from 'components/form/property/types';
import { Location } from 'components/modal/types';
import { ManageNodeTypePopover } from 'components/popover';
import { VerticalSpace } from 'components/space/vertical-space';
import { LongTitle } from 'components/typography';
import dayjs from 'dayjs';
import { NodePropertiesValues, ResponseLocationType } from 'types/node';

type ValueNamed = {
  name: string;
};

type LocationValue = {
  address: Location;
};

export function getLocation(locationValue: LocationValue) {
  return {
    location: {
      latitude: locationValue.address.lat,
      longitude: locationValue.address.lng,
    },
    address: locationValue.address.address,
  };
}

export function getNodesData(value: unknown, refPropertyType: string, isMultiple: boolean) {
  switch (refPropertyType) {
    case PropertyTypes.Text:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.Location:
      return isMultiple
        ? (value as LocationValue[]).map((item) => getLocation(item))
        : [getLocation(value as LocationValue)];
    case PropertyTypes.URL:
    case PropertyTypes.IMAGE_URL:
    case PropertyTypes.Document: // KEEP UNTIL FILE UPLOAD IS READY
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.Integer:
    case PropertyTypes.Decimal:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.Date:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.DateTime:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.Boolean:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.RichText:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    // case PropertyTypes.Document:
    //   return <DocumentType key={item.id} data={item} />;
    // case PropertyTypes.Connection:
    //   return <ConnectionType key={item.id} data={item} />;
    default:
      return [];
  }
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

const showText = (propertyType: PropertyTypes, text: string) => {
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
      return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
    case PropertyTypes.Boolean:
      return text === 'true' ? 'Yes' : 'No';
    case PropertyTypes.Text:
      return <span className="table-row-height">{text}</span>;
    default:
      return text;
  }
};

export function getColumnValue(item: NodePropertiesValues) {
  return item.nodes_data && item.nodes_data.length > 1 ? (
    <ManageNodeTypePopover
      trigger="hover"
      content={
        item.project_type_property_name === PropertyTypes.IMAGE_URL ? (
          <Space>
            {item.nodes_data.map((node) => {
              return node ? showText(item.project_type_property_name as PropertyTypes, node as string) : '';
            })}
          </Space>
        ) : (
          <VerticalSpace>
            {item.nodes_data.map((node) => {
              return (node as ResponseLocationType).address
                ? (node as ResponseLocationType).address
                : node
                ? showText(item.project_type_property_name as PropertyTypes, node as string)
                : '';
            })}
          </VerticalSpace>
        )
      }
    >{`${item.nodes_data.length} records`}</ManageNodeTypePopover>
  ) : showTextCondition(
      item.project_type_property_name as PropertyTypes,
      (item.nodes_data?.[0] as ResponseLocationType)?.address
        ? (item.nodes_data?.[0] as ResponseLocationType).address
        : (item.nodes_data?.filter(Boolean)?.join('') as string)
    ) ? (
    (item.nodes_data?.[0] as ResponseLocationType)?.address ? (
      (item.nodes_data?.[0] as ResponseLocationType).address
    ) : (
      showText(
        item.project_type_property_name as PropertyTypes,
        item.nodes_data
          ?.join('')
          .replace(/<[^>]+>/g, '')
          .replace(/&nbsp;/g, ' ') as string
      )
    )
  ) : item.project_type_property_name === PropertyTypes.IMAGE_URL ? (
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
          : showText(item.project_type_property_name as PropertyTypes, item.nodes_data?.join('') as string)
      }
    />
  );
}
