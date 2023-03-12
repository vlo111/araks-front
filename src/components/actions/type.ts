import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { ButtonProps } from 'antd';

export type ActionProps = {
    icon?: Partial<CustomIconComponentProps>;
    button?: ButtonProps;
}