import { Space } from 'antd';
import { Datepicker } from 'components/datepicker';
import { SecondaryText, Text } from 'components/typography';
import dayjs from 'dayjs';
import { COLORS, VALIDATE_MESSAGES } from 'helpers/constants';
import { FormItem } from 'components/form/form-item';
import { TypesWrapper } from './types-wrapper';
import { EdgeProperty } from 'types/edges';

type Props = {
  data: EdgeProperty;
  name: string;
};

const dateFormat = 'DD/MM/YYYY HH:mm';

export const DateTimeType = ({ data, name }: Props) => {
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
            <Datepicker
              format={dateFormat}
              style={{ width: '100%' }}
              showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm') }}
            />
          </FormItem>
        </TypesWrapper>
      </FormItem>
    </div>
  );
};
