import { DownloadOutlined } from '@ant-design/icons';
import { MainActionButton } from './main-action-button';
import { ActionProps } from './type';

export const DownloadAction = ({ button }: ActionProps) => (
  <MainActionButton helpText="Export Data" {...button} icon={<DownloadOutlined />} />
);
