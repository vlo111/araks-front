import { PlusOutlined } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

type Props = Partial<CustomIconComponentProps> & {
  onCustomClick?: () => void;
};

export const PlusAction = ({ style, onCustomClick, ...props }: Props) => (
  <PlusOutlined
    style={{ cursor: 'pointer', fontSize: '16px', color: COLORS.PRIMARY.BLUE, ...style }}
    onClick={(event) => {
      if (onCustomClick) {
        event.stopPropagation();
        onCustomClick?.();
      }
    }}
    {...props}
  />
);
