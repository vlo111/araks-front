import { useGetDictionary, GET_DICTIONARY_PROPERTY_TYPES } from 'api/dictionary/use-get-dictionary';
import { Select } from '.';
import { RefSelectProps } from 'antd';

export const PropertyDataTypeSelect = (props: Partial<RefSelectProps>) => {
  const { data } = useGetDictionary(GET_DICTIONARY_PROPERTY_TYPES);
  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Please select"
      fieldNames={{ value: 'code' }}
      options={data}
      {...props}
    />
  );
};
