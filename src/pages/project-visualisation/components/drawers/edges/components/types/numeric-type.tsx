import { Space } from 'antd';
import { InputNumber } from 'components/input-number';
import { SecondaryText, Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { FormItem } from 'components/form/form-item';
import { TypesWrapper } from './types-wrapper';
import { EdgeProperty } from 'types/edges';

type Props = {
  data: EdgeProperty;
  name: string;
};

export const NumericType = ({ data, name }: Props) => {
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
          <FormItem style={{ marginBottom: 0 }} name={[name]}>
            <InputNumber style={{ width: '100%' }} />
          </FormItem>
        </TypesWrapper>
      </FormItem>
    </div>
  );
};
