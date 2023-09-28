import { Col, Row, Skeleton } from 'antd';
import { PropertyTypes } from 'components/form/property/types';
import { EdgeProperty } from 'types/edges';
import { TextType } from './components/types/text-type';
import { NumericType } from './components/types/numeric-type';
import { DateType } from './components/types/date-type';
import { DateTimeType } from './components/types/date-time-type';
import { ProjectTypePropertyReturnData } from 'api/types';

type Props = {
  isInitialLoading: boolean;
  properties: EdgeProperty[] | undefined;
  names: ProjectTypePropertyReturnData[] | undefined;
};

export const EdgeEditView = ({ properties, names, isInitialLoading }: Props) => {
  if (isInitialLoading) {
    return <Skeleton />;
  }
  return (
    <Row justify="center">
      <Col span={12} style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        {properties?.map((item) => {
          const name = names?.find((p) => p.id === item.edge_type_property_id)?.name ?? '';
          switch (item.edge_type_property_type) {
            case PropertyTypes.Text:
              return <TextType key={item.id} data={item} name={name} />;
            case PropertyTypes.Integer:
            case PropertyTypes.Decimal:
              return <NumericType key={item.id} data={item} name={name} />;
            case PropertyTypes.Date:
              return <DateType key={item.id} data={item} name={name} />;
            case PropertyTypes.DateTime:
              return <DateTimeType key={item.id} data={item} name={name} />;
            default:
              return <></>;
          }
        })}
      </Col>
    </Row>
  );
};
