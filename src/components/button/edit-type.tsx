import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { PopoverProps } from 'antd';
import { SettingsAction } from 'components/actions';
import { AddTypeForm } from 'components/form/add-type-form';
import { AddNodeTypePopover } from 'components/popover';

export type EditTypeProps = PopoverProps & {
  onClick: () => void;
  icon?: Partial<CustomIconComponentProps>;
};

export const EditType = ({ onClick, icon, ...props }: EditTypeProps) => (
  <AddNodeTypePopover content={<AddTypeForm isEdit />} trigger="click" {...props}>
    <SettingsAction icon={icon} button={{ onClick }} />
  </AddNodeTypePopover>
);
