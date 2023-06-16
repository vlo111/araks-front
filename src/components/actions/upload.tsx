import { UploadOutlined } from '@ant-design/icons';
import { MainActionButton } from './main-action-button';
import { ActionProps } from './type';

export const UploadAction = ({ icon, button }: ActionProps) => (
  <MainActionButton helpText="Settings" {...button} icon={<UploadOutlined />} />
);
