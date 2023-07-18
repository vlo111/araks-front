import { Form, Radio } from 'antd';
import { ImportActionType, useImport } from 'context/import-context';
import { useEffect } from 'react';
import { FormItem } from '../form-item';

type FirstRowISColumn = {
  firstRowIsColumn: string;
};

export const FirstRowColumnName = () => {
  const [form] = Form.useForm();
  const { state, dispatch } = useImport();

  useEffect(() => {
    if (state.firstRowIsColumn) {
      form.setFieldValue('firstRowIsColumn', state.firstRowIsColumn);
    }
  }, [form, state.firstRowIsColumn]);

  const onFinish = (values: FirstRowISColumn) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
    dispatch({
      type: ImportActionType.IMPORT_CLEANING_FIRST_ROW_AS_HEADER,
      payload: { firstRowIsColumn: values.firstRowIsColumn },
    });
  };
  return (
    <Form name="first-row-column-name" form={form} onFinish={onFinish} autoComplete="off" layout="vertical">
      <FormItem
        name="firstRowIsColumn"
        label="First row contains column name ?"
        required
        rules={[{ required: true, message: 'Please fill rows cunt to skip!' }]}
        onChange={() => {
          form.submit();
        }}
      >
        <Radio.Group options={['yes', 'no']} />
      </FormItem>
    </Form>
  );
};
