import { Col, Row, Skeleton } from 'antd';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { VerticalSpace } from 'components/space/vertical-space';
import { EdgeDirection } from 'pages/data-sheet/components/connection-table/components/direction';
import { Source } from 'pages/data-sheet/components/connection-table/components/source';
import { Target } from 'pages/data-sheet/components/connection-table/components/target';
import { ConnectionSourceForm } from './connection/source-form';
import { ConnectionTargetForm } from './connection/target-form';
import { FormItem } from './form-item';
import { PropertyTypes } from './property/types';
import { BooleanType } from './type/boolean-type';
import { ConnectionType } from './type/connection-type';
import { DateTimeType } from './type/date-time-type';
import { DateType } from './type/date-type';
import { DocumentType } from './type/document-type';
import { LocationType } from './type/location-type';
import { NumericType } from './type/numeric-type';
import { RichTextType } from './type/rich-text-type';
import { TextType } from './type/text-type';
import { UrlType } from './type/url-type';

type Props = { data: EdgeTypePropertiesResponse; isInitialLoading: boolean };

export const AddConnectionNodeForm = ({ data, isInitialLoading }: Props) => {
  if (isInitialLoading) {
    return <Skeleton />;
  }
  return (
    <VerticalSpace>
      <Row align="middle" justify="center">
        <Col span={8}>
          <Source sourceData={data.source} />
          <FormItem wrapperCol={{ span: 24 }} noStyle required style={{ marginBottom: '0' }}>
            <ConnectionSourceForm data={data} />
          </FormItem>
        </Col>
        <Col>
          <EdgeDirection data={data} />
        </Col>
        <Col span={8}>
          <Target dataTarget={data.target} />
          <FormItem wrapperCol={{ span: 24 }} noStyle required style={{ marginBottom: '0' }}>
            <ConnectionTargetForm data={data} />
          </FormItem>
        </Col>
      </Row>
      <div style={{ boxShadow: '0px 10px 10px 0px rgba(111, 111, 111, 0.10) inset', padding: '40px 0 0' }}>
        <Row justify="center">
          <Col span={8}>
            {data?.properties?.map((item) => {
              // eslint-disable-next-line no-console
              console.log('item', item);
              switch (item.ref_property_type_id) {
                case PropertyTypes.Text:
                  return <TextType key={item.id} data={item} />;
                case PropertyTypes.Location:
                  return <LocationType key={item.id} data={item} />;
                case PropertyTypes.URL:
                case PropertyTypes.IMAGE_URL:
                  return <UrlType key={item.id} data={item} />;
                case PropertyTypes.Integer:
                case PropertyTypes.Decimal:
                  return <NumericType key={item.id} data={item} />;
                case PropertyTypes.Date:
                  return <DateType key={item.id} data={item} />;
                case PropertyTypes.DateTime:
                  return <DateTimeType key={item.id} data={item} />;
                case PropertyTypes.Boolean:
                  return <BooleanType key={item.id} data={item} />;
                case PropertyTypes.RichText:
                  return <RichTextType key={item.id} data={item} />;
                case PropertyTypes.Document:
                  return <DocumentType key={item.id} data={item} />;
                case PropertyTypes.Connection:
                  return <ConnectionType key={item.id} data={item} />;
                default:
                  return <></>;
              }
            })}
          </Col>
        </Row>
      </div>
    </VerticalSpace>
  );
};
