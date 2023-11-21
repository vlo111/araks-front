import { Space } from 'antd';
import { HeaderProfile } from 'components/header-profile';
import { Help } from 'components/help';
import { Notifications } from 'components/notifications';

import { Search } from 'components/search';

export const HeaderSearch = () => {
  return (
    <Space size={32}>
      <Search />
      <div style={{ height: '41px' }}>
        <Help />
      </div>
      <div style={{ height: '41px' }}>
        <Notifications />
      </div>
      <HeaderProfile />
    </Space>
  );
};
