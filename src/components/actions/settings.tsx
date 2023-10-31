import { EditOutlined } from '@ant-design/icons';
import { forwardRef } from 'react';
import { MainActionButton } from './main-action-button';
import { ActionProps } from './type';

export const SettingsAction = forwardRef<HTMLButtonElement, ActionProps>(({ icon, button }, ref) => (
  <MainActionButton helpText="Edit" {...button} icon={<EditOutlined />} />
));
