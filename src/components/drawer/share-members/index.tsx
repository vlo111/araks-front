import { FC } from 'react';
import { Drawer } from 'antd';
import { bodyStyle, contentStyle, drawerStyle, drawerPosition } from './styles';
import { DrawerTitle } from './components/drawer-title';
import { InviteUsers } from './components/invite-users';
import { UsersTable } from './components/user-list-table';

export const SeeAllMembersDrawer: FC<{ id: string; open: boolean; onClose: VoidFunction }> = ({
  id,
  open,
  onClose,
}) => {
  return (
    <Drawer
      open={open}
      mask={false}
      destroyOnClose
      closable={false}
      placement="right"
      getContainer={false}
      bodyStyle={bodyStyle}
      drawerStyle={drawerStyle}
      title={<DrawerTitle onClose={onClose} />}
      contentWrapperStyle={{ ...contentStyle, ...drawerPosition() }}
    >
      <InviteUsers id={id} />
      <UsersTable />
    </Drawer>
  );
};
