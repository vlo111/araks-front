import { Select } from '.';
import { RefSelectProps } from 'antd';
import { useSchema } from '../layouts/components/schema/wrapper';

export const EdgeDataTypeSelect = (props: Partial<RefSelectProps>) => {
  const { nodes } = useSchema() || {};

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Please select"
      fieldNames={{ value: 'name' }}
      options={nodes}
      {...props}
    />
  );
};
