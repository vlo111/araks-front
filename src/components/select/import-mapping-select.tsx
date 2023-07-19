import { Select } from '.';
import { RefSelectProps } from 'antd';
import { useImport } from 'context/import-context';

export const ImportMappingSelect = (props: Partial<RefSelectProps>) => {
  const { state } = useImport();

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Select"
      options={state.columnRow?.map((item) => ({ label: item, key: item }))}
      {...props}
    />
  );
};
