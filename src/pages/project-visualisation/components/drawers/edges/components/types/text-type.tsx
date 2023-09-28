import { Space } from 'antd';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { FormItem } from 'components/form/form-item';
import { Input } from 'components/input';
import { TypesWrapper } from './types-wrapper';
import { EdgeProperty } from 'types/edges';

type Props = {
  data: EdgeProperty;
  name: string;
};

export const TextType = ({ data, name }: Props) => {
  const label = (
    <Space>
      <Text color={COLORS.PRIMARY.BLUE}>{name}</Text>
      <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.edge_type_property_type})`}</SecondaryText>
    </Space>
  );
  const validateMaxLength = (rule: unknown, value: string) => {
    if (value && value.length > 80) {
      return Promise.reject(`Max length exceeded (max 80 characters)`);
    }
    return Promise.resolve();
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <FormItem label={label} style={{ marginBottom: '0' }}>
        <TypesWrapper>
          <FormItem
            style={{ marginBottom: 0 }}
            name={[name]}
            rules={[{ required: false, message: VALIDATE_MESSAGES.required }, { validator: validateMaxLength }]}
          >
            <Input />
          </FormItem>
        </TypesWrapper>
      </FormItem>
    </div>
  );
};
