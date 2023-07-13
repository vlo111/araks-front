import { useGetDictionary, GET_DICTIONARY_PROPERTY_TYPES } from 'api/dictionary/use-get-dictionary';
import { Select } from '.';
import { RefSelectProps } from 'antd';
import { PropertyTypes } from 'components/form/property/types';

type Props = Partial<RefSelectProps> & { propertyTypeId?: PropertyTypes };

type PropertyDataType = {
  code: PropertyTypes;
  name: string;
};

const editPropertyList = {
  [PropertyTypes.Text]: [
    PropertyTypes.Text,
    PropertyTypes.Date,
    PropertyTypes.DateTime,
    PropertyTypes.Decimal,
    PropertyTypes.Integer,
    PropertyTypes.URL,
    PropertyTypes.Boolean,
    PropertyTypes.Location,
  ],
  [PropertyTypes.Date]: [PropertyTypes.Text, PropertyTypes.Date, PropertyTypes.DateTime],
  [PropertyTypes.DateTime]: [PropertyTypes.Text, PropertyTypes.Date, PropertyTypes.DateTime],
  [PropertyTypes.Integer]: [PropertyTypes.Text, PropertyTypes.Decimal, PropertyTypes.Integer],
  [PropertyTypes.Decimal]: [PropertyTypes.Text, PropertyTypes.Decimal, PropertyTypes.Integer],
  [PropertyTypes.URL]: [PropertyTypes.Text, PropertyTypes.URL],
  [PropertyTypes.Boolean]: [PropertyTypes.Text, PropertyTypes.Boolean],
  [PropertyTypes.Location]: [PropertyTypes.Text, PropertyTypes.Location],
  [PropertyTypes.Connection]: [PropertyTypes.Text, PropertyTypes.Connection],
  [PropertyTypes.IMAGE_URL]: [PropertyTypes.IMAGE_URL],
  [PropertyTypes.Document]: [PropertyTypes.Document],
  [PropertyTypes.RichText]: [
    PropertyTypes.RichText,
    PropertyTypes.Text,
    PropertyTypes.Date,
    PropertyTypes.DateTime,
    PropertyTypes.Decimal,
    PropertyTypes.Integer,
    PropertyTypes.URL,
    PropertyTypes.Boolean,
    PropertyTypes.Location,
  ],
};

export const PropertyDataTypeSelect = (props: Props) => {
  const { data } = useGetDictionary<PropertyDataType[]>(GET_DICTIONARY_PROPERTY_TYPES, {
    select: (data: { data: PropertyDataType[] }) => {
      if (props.propertyTypeId) {
        return {
          data: data.data.filter((item) => {
            return editPropertyList[props.propertyTypeId || PropertyTypes.Text].includes(item.code);
          }),
        };
      }
      return data;
    },
    enabled: true,
  });

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Please select"
      fieldNames={{ value: 'code', label: 'name' }}
      options={data}
      {...props}
    />
  );
};
