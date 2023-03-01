import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { ReactComponent as AraksSmall } from '../icons/araks-small.svg';


export const ProjectIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={AraksSmall} {...props} />
  )
