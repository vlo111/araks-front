import { PlusOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd';
import { MainActionButton } from './main-action-button';

type Props = ButtonProps & {
  helpText: string;
};

export const AddAction = ({ helpText, ...props }: Props) => (
  <MainActionButton helpText={helpText} {...props} icon={<PlusOutlined />} />
);
