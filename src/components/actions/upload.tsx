import { UploadOutlined } from '@ant-design/icons';
import { ActionProps } from './type';
import { Wrapper } from './wrapper';

export const UploadAction = ({ icon, button }: ActionProps) => <Wrapper
    {...button}
    icon={<UploadOutlined style={{ cursor: 'pointer', fontSize: '16px', color: '#C3C3C3', ...icon?.style }} {...icon} />}
/>
