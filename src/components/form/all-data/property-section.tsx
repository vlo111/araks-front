import { CloseOutlined } from '@ant-design/icons';
import { Collapse, Form, Space } from 'antd';
import { Input } from 'components/input';
import { InputNumber } from 'components/input-number';
import { QueriesSelect, QueryFilterTypes } from 'components/select/queries-select';
import { VerticalSpace } from 'components/space/vertical-space';

type Props = {
  remove: (x: number) => void;
  fieldName: number;
};

type ContentType = {
  fieldName: number;
};

export const QueriesContent = ({ fieldName }: ContentType) => {
  const type = Form.useWatch(['queries', fieldName, 'type']);
  // eslint-disable-next-line no-console
  console.log('type', type);
  switch (type) {
    case QueryFilterTypes.CONTAINS:
    case QueryFilterTypes.IS:
    case QueryFilterTypes.IS_NOT:
      return <Input />;
    case QueryFilterTypes.GREATHER_THAN:
      return <InputNumber addonAfter="<" style={{ width: '100%' }} />;
    case QueryFilterTypes.LESS_THAN:
      return <InputNumber addonBefore="<" style={{ width: '100%' }} />;
    case QueryFilterTypes.IS_NOT_NULL:
    case QueryFilterTypes.IS_NULL:
      return <></>;
    case QueryFilterTypes.BETWEEN:
      return (
        <Space>
          <InputNumber />
          <span>-</span>
          <InputNumber />
        </Space>
      );
    case QueryFilterTypes.EQUAL_TO:
      return <InputNumber addonBefore="=" style={{ width: '100%' }} />;
    default:
      return <></>;
  }
};

export const PropertySection = ({ remove, fieldName }: Props) => {
  const form = Form.useFormInstance();
  const onChange = (key: string | string[]) => {
    // eslint-disable-next-line no-console
    console.log(key);
  };

  const queriesList = form.getFieldValue('queriesList');

  const genExtra = () => (
    <CloseOutlined
      onClick={(event) => {
        event.stopPropagation();
        remove(fieldName);
      }}
    />
  );

  return (
    <Collapse
      defaultActiveKey={['1']}
      onChange={onChange}
      items={[
        {
          key: '1',
          label: queriesList[fieldName].labelName,
          children: (
            <VerticalSpace>
              <Form.Item name={[fieldName, 'type']} rules={[{ required: true, message: 'Missing type' }]}>
                <QueriesSelect />
              </Form.Item>
              <Form.Item
                name={[fieldName, 'typeText']}
                rules={[{ required: true, message: 'Missing type text' }]}
                noStyle
              >
                <QueriesContent fieldName={fieldName} />
              </Form.Item>
            </VerticalSpace>
          ),
          extra: genExtra(),
          showArrow: false,
        },
      ]}
    />
  );
};
