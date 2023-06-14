import { Radio, Space } from 'antd';
import { ProjectTypePropertyReturnData } from 'api/types';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { FormItem } from '../form-item';

type Props = {
  data: ProjectTypePropertyReturnData;
};

export const BooleanType = ({ data }: Props) => {
  const label = (
    <Space>
      <Text color={COLORS.PRIMARY.BLUE}>{`${data.name}`}</Text>
      <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.ref_property_type_id})`}</SecondaryText>
    </Space>
  );

  return (
    <div style={{ textAlign: 'left' }}>
      <FormItem
        key={data.id}
        name={[data.name, 0]}
        label={label}
        rules={[{ required: data.required_type, message: VALIDATE_MESSAGES.required }]}
      >
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </FormItem>
    </div>
  );
};
