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

const getOptions = (depth: number, isConnection: boolean) => {
  switch (true) {
    case (!isConnection && depth === 1) || (isConnection && (depth === 1 || depth === 2)):
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
      ];
    default:
      return Object.values(QueryFilterTypes).map((item) => ({ name: item, value: item }));
  }
};

type Props = Partial<RefSelectProps> & {
  depth: number;
  isConnection: boolean;
};

export const QueriesSelect = (props: Props) => {
  const data = getOptions(props.depth, !!props?.isConnection);
  return <Select style={{ width: '100%' }} placeholder="Please select" options={data} {...props} />;
};
