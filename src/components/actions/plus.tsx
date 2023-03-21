import { PlusOutlined } from '@ant-design/icons';
import { ActionProps } from './type';
import { Wrapper } from './wrapper';
import { COLORS } from 'helpers/constants';

export const PlusAction = ({ icon, button }: ActionProps) => <Wrapper
    {...button}
    icon={<PlusOutlined style={{ cursor: 'pointer', fontSize: '16px', color: COLORS.PRIMARY.BLUE, ...icon?.style }} {...icon} />}
/>
