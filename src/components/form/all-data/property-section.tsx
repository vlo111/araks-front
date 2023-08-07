import { CloseOutlined } from '@ant-design/icons';
import { Collapse, Form } from 'antd';
import { QueriesSelect } from 'components/select/queries-select';
import { VerticalSpace } from 'components/space/vertical-space';

type Props = {
  remove: (x: number) => void;
  fieldName: number;
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
      //   expandIconPosition={expandIconPosition}
      items={[
        {
          key: '1',
          label: queriesList[fieldName].labelName,
          children: (
            <VerticalSpace>
              <Form.Item
                label="Sight"
                name={[fieldName, 'sight']}
                rules={[{ required: true, message: 'Missing sight' }]}
              >
                <QueriesSelect />
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
