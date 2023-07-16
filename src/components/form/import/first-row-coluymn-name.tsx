import { Radio } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';

export const FirstRowColumnName = () => {
  return (
    <VerticalSpace size="small">
      <Text>First row contains column name ?*</Text>
      <Radio.Group name="firstRowIsColumn" options={['yes', 'no']} />
    </VerticalSpace>
  );
};
