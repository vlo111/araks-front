// import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Icon } from 'components/icon';
import { DEFAULT_ICON } from 'helpers/constants';

type Props = Partial<CustomIconComponentProps> & {
  icon?: string;
  size?: number;
};

export const ProjectIcon = ({ icon, size = 25, ...props }: Props) => (
  <Icon color="#353432" icon={icon || DEFAULT_ICON} size={size} {...props} />
);
