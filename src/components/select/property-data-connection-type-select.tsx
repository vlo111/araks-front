import { Select } from '.';
import { RefSelectProps } from 'antd';
import { ConnectionPropertyTypes } from 'components/form/property/types';

export const PropertyDataConnectionTypeSelect = (props: Partial<RefSelectProps>) => {
  const data = Object.values(ConnectionPropertyTypes).map((item) => ({ name: item, value: item }));
  return <Select style={{ width: '100%' }} placeholder="Please select" options={data} {...props} />;
};
