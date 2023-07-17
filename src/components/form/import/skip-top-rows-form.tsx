import { Form } from 'antd';
import { Button } from 'components/button';
import { InputNumber } from 'components/input-number';
import { ImportActionType, useImport } from 'context/import-context';
import { FormItem } from '../form-item';

type SkipTopRows = {
  rowsCount: number;
};

export const SkipTopRowsForm = () => {
  const [form] = Form.useForm();
  const { state, dispatch } = useImport();
  // eslint-disable-next-line no-console
  console.log('state', state);

  const onFinish = (values: SkipTopRows) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
    dispatch({ type: ImportActionType.IMPORT_CLEANING_SKIP_ROWS, payload: { skipRowsCount: values.rowsCount } });
  };

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
