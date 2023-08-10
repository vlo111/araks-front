import { Select } from '.';
import { RefSelectProps } from 'antd';

export enum QueryFilterTypes {
  GREATHER_THAN = 'Greather than',
  LESS_THAN = 'Less Than',
  CONTAINS = 'Contains',
  IS_NOT_NULL = 'Is not Null',
  IS_NULL = 'Is Null',
  BETWEEN = 'Between',
  IS = 'Is',
  IS_NOT = 'Is not',
  EQUAL_TO = 'Equal to',
}

export const QueriesSelect = (props: Partial<RefSelectProps>) => {
  const data = Object.values(QueryFilterTypes).map((item) => ({ name: item, value: item }));
  return <Select style={{ width: '100%' }} placeholder="Please select" options={data} {...props} />;
};
