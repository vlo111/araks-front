import { PlusOutlined } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

export const PlusAction = ({ style, ...props }: Partial<CustomIconComponentProps>) => (
  <PlusOutlined style={{ cursor: 'pointer', fontSize: '16px', color: COLORS.PRIMARY.BLUE, ...style }} {...props} />
);
