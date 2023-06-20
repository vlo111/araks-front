import { DeleteOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd';
import { MainActionButton } from './main-action-button';

export const DeleteAction = (props: ButtonProps) => (
  <MainActionButton helpText="Delete" {...props} icon={<DeleteOutlined />} />
);
