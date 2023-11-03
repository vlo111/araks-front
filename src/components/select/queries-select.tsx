import { Select } from '.';
import { RefSelectProps } from 'antd';
import { PropertyTypes } from 'components/form/property/types';

export enum QueryFilterTypes {
  GREATHER_THAN = 'Greather than',
  LESS_THAN = 'Less Than',
  CONTAINS = 'Contains',
  IS_NOT_NULL = 'Is not Null',
  IS_NULL = 'Is Null',
  BETWEEN = 'Between',
  BEFORE = 'Before',
  AFTER = 'After',
  IS = 'Is',
  IS_NOT = 'Is not',
  EQUAL_TO = 'Equal to',
  RANGE = 'Range',
}

export const getQueryFilterType = (type: QueryFilterTypes): string => {
  switch (type) {
    case QueryFilterTypes.GREATHER_THAN:
      return '>';
    case QueryFilterTypes.LESS_THAN:
      return '<';
    case QueryFilterTypes.EQUAL_TO:
      return '=';
    case QueryFilterTypes.IS_NOT:
      return 'IS_NOT_VALUE';
    case QueryFilterTypes.IS:
      return 'IS_VALUE';
    case QueryFilterTypes.RANGE:
      return 'BETWEEN';
    case QueryFilterTypes.BETWEEN:
      return 'BETWEEN';
    case QueryFilterTypes.BEFORE:
      return '<';
    case QueryFilterTypes.AFTER:
      return '>';
    case QueryFilterTypes.IS_NULL:
      return 'IS_NULL';
    case QueryFilterTypes.IS_NOT_NULL:
      return 'IS_NOT_NULL';
    case QueryFilterTypes.CONTAINS:
      return 'CONTAINS';
    default:
      return '';
  }
};

const getOptions = (
  depth: number,
  isConnection = false,
  isVisualisation = false,
  propertyType?: PropertyTypes,
  isMultiple?: boolean
) => {
  switch (true) {
    case (!isConnection && depth === 1) || (isConnection && (depth === 1 || depth === 2)):
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
      ];
    case propertyType === PropertyTypes.Integer || propertyType === PropertyTypes.Decimal: {
      const numberProperties = [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
      ];

      if (isMultiple) return numberProperties;
      else
        return [
          ...numberProperties,
          { name: QueryFilterTypes.GREATHER_THAN, value: QueryFilterTypes.GREATHER_THAN },
          { name: QueryFilterTypes.LESS_THAN, value: QueryFilterTypes.LESS_THAN },
          { name: QueryFilterTypes.EQUAL_TO, value: QueryFilterTypes.EQUAL_TO },
          { name: QueryFilterTypes.BETWEEN, value: QueryFilterTypes.BETWEEN },
        ];
    }
    case propertyType === PropertyTypes.Date || propertyType === PropertyTypes.DateTime: {
      const dateProperties = [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
      ];
      if (isMultiple) return dateProperties;
      else
        return [
          ...dateProperties,
          { name: QueryFilterTypes.RANGE, value: QueryFilterTypes.RANGE },
          { name: QueryFilterTypes.BEFORE, value: QueryFilterTypes.BEFORE },
          { name: QueryFilterTypes.AFTER, value: QueryFilterTypes.AFTER },
        ];
    }
    case propertyType === PropertyTypes.Text && isVisualisation:
      return [
        { name: QueryFilterTypes.IS, value: QueryFilterTypes.IS },
        { name: QueryFilterTypes.IS_NOT, value: QueryFilterTypes.IS_NOT },
        { name: QueryFilterTypes.CONTAINS, value: QueryFilterTypes.CONTAINS },
      ];
    case propertyType === PropertyTypes.Text:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
        { name: QueryFilterTypes.IS, value: QueryFilterTypes.IS },
        { name: QueryFilterTypes.IS_NOT, value: QueryFilterTypes.IS_NOT },
        { name: QueryFilterTypes.CONTAINS, value: QueryFilterTypes.CONTAINS },
      ];
    case propertyType === PropertyTypes.Boolean:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
        { name: QueryFilterTypes.IS, value: QueryFilterTypes.IS },
        { name: QueryFilterTypes.IS_NOT, value: QueryFilterTypes.IS_NOT },
      ];
    case propertyType === PropertyTypes.URL:
    case propertyType === PropertyTypes.IMAGE_URL:
    case propertyType === PropertyTypes.Document:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
      ];
    case propertyType === PropertyTypes.Location:
      return [
        { name: QueryFilterTypes.IS_NULL, value: QueryFilterTypes.IS_NULL },
        { name: QueryFilterTypes.IS_NOT_NULL, value: QueryFilterTypes.IS_NOT_NULL },
        { name: QueryFilterTypes.CONTAINS, value: QueryFilterTypes.CONTAINS },
      ];
    case propertyType === PropertyTypes.Connection:
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
  propertyType?: PropertyTypes;
  isVisualisation?: boolean;
  isMultiple: boolean;
};

export const QueriesSelect = ({
  depth,
  isConnection,
  propertyType,
  isVisualisation = false,
  isMultiple,
  ...props
}: Props) => {
  const data = getOptions(depth, !!isConnection, isVisualisation, propertyType, isMultiple);
  return <Select style={{ width: '100%' }} placeholder="Please select" options={data} {...props} />;
};
