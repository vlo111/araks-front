import { Form } from 'antd';
import { Button } from 'components/button';
import { InputNumber } from 'components/input-number';
import { FormItem } from '../form-item';

type SkipTopRows = {
  rowsCount: number;
};

export const SkipTopRowsForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: SkipTopRows) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  const rowsCount = form.getFieldValue('rowsCount');
  // eslint-disable-next-line no-console
  console.log('rowsCount', rowsCount, form.getFieldValue('rowsCount'));

  return (
    <Form
      name="skip-top-rows"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
    >
      <FormItem
        name="rowsCount"
        label="Skip top rows"
        rules={[{ required: true, message: 'Please fill rows cunt to skip!' }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </FormItem>
      <FormItem>
        <Button block type="primary" htmlType="submit">
          Accept
        </Button>
      </FormItem>
    </Form>
  );
};
