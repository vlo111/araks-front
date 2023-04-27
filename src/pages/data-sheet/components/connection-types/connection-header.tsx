import { Space } from 'antd';
import { Text } from 'components/typography';

import { PropsSetState } from '../../types';
import { SearchIcon } from 'components/icon';

export const ConnectionHeader = ({ setSearchVisible }: PropsSetState) => {
  return (
    <Space size={8} style={{ width: '100%', justifyContent: 'space-between' }} align="center">
      <Space>
        <Text>Connection type</Text>
        <SearchIcon setSearchActive={setSearchVisible} />
      </Space>
    </Space>
  );
};
