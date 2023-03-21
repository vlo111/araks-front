import { DownloadOutlined } from '@ant-design/icons';
import { ActionProps } from './type';
import { Wrapper } from './wrapper';

export const DownloadAction = ({ icon, button }: ActionProps) => <Wrapper
    {...button}
    icon={<DownloadOutlined style={{ cursor: 'pointer', fontSize: '16px', color: '#C3C3C3', ...icon?.style }} {...icon} />}
/>
