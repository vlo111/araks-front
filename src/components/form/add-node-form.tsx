import { Col, Form, Row, Skeleton } from 'antd';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { VerticalSpace } from 'components/space/vertical-space';
import { PropertyTypes } from './property/types';
import { BooleanType } from './type/boolean-type';
import { ConnectionType } from './type/connection-type';
import { DateType } from './type/date-type';
import { DocumentType } from './type/document-type';
import { LocationType } from './type/location-type';
import { NumericType } from './type/numeric-type';
import { RichTextType } from './type/rich-text-type';
import { TextType } from './type/text-type';
import { UrlType } from './type/url-type';

export const AddNodeForm = () => {
  const [form] = Form.useForm();
  const { nodeTypeId, isConnectionType } = useDataSheetWrapper();
  const { isInitialLoading, data } = useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!(nodeTypeId && isConnectionType === false),
  });

  const onFinish = () => {
    return;
  };

  if (isInitialLoading) {
    return <Skeleton />;
  }

  return (
    <Form name="project-node" form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
      <VerticalSpace>
        <Row justify="center">
          <Col xs={16} xl={12}>
            {data?.map((item) => {
              // eslint-disable-next-line no-console
              console.log('item', item);
              switch (item.ref_property_type_id) {
                case PropertyTypes.Text:
                  return <TextType key={item.id} data={item} />;
                case PropertyTypes.Location:
                  return <LocationType key={item.id} data={item} />;
                case PropertyTypes.URL:
                  return <UrlType key={item.id} data={item} />;
                case PropertyTypes.Integer:
                case PropertyTypes.Decimal:
                  return <NumericType key={item.id} data={item} />;
                case PropertyTypes.DateTime:
                  return <DateType key={item.id} data={item} />;
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
      </VerticalSpace>
    </Form>
  );
};
