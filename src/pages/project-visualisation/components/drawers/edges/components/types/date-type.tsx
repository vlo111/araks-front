import { Space } from 'antd';
import { Datepicker } from 'components/datepicker';
import { SecondaryText, Text } from 'components/typography';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { TypesWrapper } from './types-wrapper';
import { FormItem } from 'components/form/form-item';
import { EdgeProperty } from 'types/edges';

type Props = {
  data: EdgeProperty;
  name: string;
};

const dateFormat = 'DD/MM/YYYY';

export const DateType = ({ data, name }: Props) => {
  const label = (
    <Space>
      <Text color={COLORS.PRIMARY.BLUE}>{name}</Text>
      <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${data.edge_type_property_type})`}</SecondaryText>
    </Space>
  );

  return (
    <div style={{ textAlign: 'left' }}>
      <FormItem label={label} required={false} style={{ marginBottom: '0' }}>
        <TypesWrapper>
          <FormItem
            name={[name]}
            style={{ marginBottom: 0 }}
            rules={[{ required: false, message: VALIDATE_MESSAGES.required }]}
          >
            <Datepicker style={{ width: '100%' }} format={dateFormat} />
          </FormItem>
        </TypesWrapper>
      </FormItem>
    </div>
  );
};
