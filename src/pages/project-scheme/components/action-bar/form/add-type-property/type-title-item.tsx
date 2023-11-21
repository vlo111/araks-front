import { Form } from 'antd';
import { FormInput } from 'components/input';
import { FormItem } from 'components/form/form-item';
import { PropertyTypes } from 'components/form/property/types';
import { Rule } from 'antd/es/form';

export const AddSchemaTypePropertyTitle = () => {
  const dataType = Form.useWatch('ref_property_type_id', { preserve: true });

  const isConnection = dataType === PropertyTypes.Connection;

  return (
    <FormItem
      name="name"
      label="Property name"
      rules={[
        {
          required: true,
          message: 'Property name is required',
        },
        {
          min: isConnection ? 2 : 3,
          message: `The minimum length for this field is ${isConnection ? 2 : 3} characters`,
        },
        { max: 30, message: 'The maximum length for this field is 30 characters' },
        {
          validator: async (_: Rule, value: string | undefined) => {
            if (value !== undefined) {
              const regex = /^[a-z0-9_]+$/;
              if (!regex.test(value)) {
                return Promise.reject('Name must only contain lowercase letters, numbers and underscores');
              }
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <FormInput placeholder="Property name" />
    </FormItem>
  );
};
