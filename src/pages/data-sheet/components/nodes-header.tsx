import { Space } from 'antd';
import { Text } from 'components/typography';

import { PropsSetState } from '../types';
import { SearchIcon } from 'components/icon';

export const NodesHeader = ({ setSearchVisible }: PropsSetState) => {
  return (
    <Space size={8} style={{ width: '100%', justifyContent: 'space-between' }} align="center">
      <Space>
        <Text>Node Type</Text>
        <SearchIcon setSearchActive={setSearchVisible} />
      </Space>
    </Space>
  );
};
