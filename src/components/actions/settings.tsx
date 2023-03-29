import { SettingOutlined } from '@ant-design/icons';
import { forwardRef } from 'react';
import { ActionProps } from './type';
import { Wrapper } from './wrapper';

export const SettingsAction = forwardRef<HTMLButtonElement, ActionProps>(({ icon, button }, ref) => (
  <Wrapper
    {...button}
    ref={ref}
    icon={
      <SettingOutlined style={{ cursor: 'pointer', fontSize: '16px', color: '#C3C3C3', ...icon?.style }} {...icon} />
    }
  />
));
