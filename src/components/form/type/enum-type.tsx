import { Form, Space } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { AddNewFieldButton } from 'components/button/add-new-field-button';
import { Input } from 'components/input';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { FormItem } from '../form-item';
import { TypeWrapper } from './type-wrapper';

type Props = {
  data: ProjectTypePropertyReturnData;
};

export const EnumType = ({ data }: Props) => {
  const label = (
    <Space>
      <Text color={COLORS.PRIMARY.BLUE}>{`${data.name}`}</Text>
      <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.ref_property_type_id})`}</SecondaryText>
    </Space>
  );
  const validateMaxLength = (rule: unknown, value: string) => {
    if (value && value.length > (data.default_property ? 30 : 80)) {
      return Promise.reject(`Max length exceeded (max ${data.default_property ? 30 : 80} characters)`);
    }
    return Promise.resolve();
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <Form.List name={data.name} initialValue={[null]}>
        {(fields, { add, remove }) => (
          <>
            <FormItem label={label} style={{ marginBottom: '0' }}>
              <VerticalSpace>
                {fields.map((field) => (
                  <TypeWrapper
                    key={field.name}
                    fieldLength={fields.length}
                    field={field}
                    onRemove={() => remove(field.name)}
                  >
                    <FormItem
                      style={{ marginBottom: 0 }}
                      name={[field.name]}
                      rules={[
                        { required: data.required_type, message: VALIDATE_MESSAGES.required },
                        { validator: validateMaxLength },
                      ]}
                    >
                      <Input />
                    </FormItem>
                  </TypeWrapper>
                ))}
              </VerticalSpace>
            </FormItem>
            {data.multiple_type === true && <AddNewFieldButton onClick={() => add(null)} />}
          </>
        )}
      </Form.List>
    </div>
  );
};
