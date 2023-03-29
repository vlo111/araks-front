import { Button, Space } from 'antd';
import { CaretUpFilled, CaretDownFilled, PlusOutlined } from '@ant-design/icons';
import { Text } from 'components/typography';

import { SearchAction } from 'components/actions';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropsSetState } from '../types';
import { COLORS } from 'helpers/constants';
import { useState } from 'react';
import { SearchIcon } from 'components/actions/search';
import { VerticalSpace } from 'components/space/vertical-space';
import styled from 'styled-components';

const ColapseNode = styled(Button)`
  padding: 0;
`;

export const NodesHeader = ({ visible, setVisible }: PropsSetState) => {
  const { startAddType } = useDataSheetWrapper();
  const [isSearchActive, setSearchActive] = useState(false);

  return (
    <VerticalSpace>
      <Space size={8} style={{ width: '100%', padding: '24px 24px 0', justifyContent: 'space-between' }} align="center">
        <Space>
          <ColapseNode
            type="text"
            icon={
              visible ? (
                <CaretDownFilled style={{ color: COLORS.PRIMARY.GRAY }} />
              ) : (
                <CaretUpFilled style={{ color: COLORS.PRIMARY.GRAY }} />
              )
            }
            onClick={() => setVisible((prev) => !prev)}
          >
            <Text>Node Type</Text>
          </ColapseNode>
          <SearchIcon setSearchActive={setSearchActive} />
        </Space>
        <PlusOutlined style={{ cursor: 'pointer' }} onClick={startAddType} />
      </Space>
      {isSearchActive && <SearchAction isSearchActive={isSearchActive} setSearchActive={setSearchActive} />}
    </VerticalSpace>
  );
};
