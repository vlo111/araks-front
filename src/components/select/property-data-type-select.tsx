import { useGetDictionary, GET_DICTIONARY_PROPERTY_TYPES } from 'api/dictionary/use-get-dictionary';
import { Select } from '.';
import { RefSelectProps } from 'antd';
import { PropertyTypes } from 'components/form/property/types';
import { PageParameters } from 'api/types';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import { useGetTypeNodes } from 'api/node/use-get-type-nodes';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';

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
const initPageData: PageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

/**
 * Property Data type selection
 * @param props
 * @returns
 */
export const PropertyDataTypeSelect = (props: Props) => {
  const { nodeTypeId } = useDataSheetWrapper();

  const { count: dataCount, isFetched } = useGetTypeNodes(initPageData, nodeTypeId, {
    enabled: !!props.propertyTypeId,
  });

  const { data } = useGetDictionary<PropertyDataType[]>(GET_DICTIONARY_PROPERTY_TYPES, {
    select: (data: { data: PropertyDataType[] }) => {
      if (props.propertyTypeId && dataCount) {
        return {
          data: data.data.map((item) => ({
            ...item,
            disabled: !editPropertyList[props.propertyTypeId || PropertyTypes.Text].includes(item.code),
          })),
        };
      }
      return data;
    },
    enabled: (props.propertyTypeId && isFetched) || !props.propertyTypeId,
  });

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Please select"
      fieldNames={{ value: 'code', label: 'name' }}
      options={data}
      // onSelect={(value) => {
      //   setPropertyType(value as PropertyTypes);
      //   if (props.propertyTypeId !== value) {
      //     form.setFieldValue('hasWarning', true);
      //   }
      // }}
      {...props}
    />
  );
};
