import { Select } from '.';
import { RefSelectProps } from 'antd';

enum ConnectionTypes {
  TEXT = 'text',
  DATE = 'data',
  DATETIME = 'datetime',
  INTEGER = 'integer',
  DECIMAL = 'decimal',
}

export const PropertyDataConnectionTypeSelect = (props: Partial<RefSelectProps>) => {
  const data = Object.values(ConnectionTypes).map((item) => ({ name: item, value: item }));
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
