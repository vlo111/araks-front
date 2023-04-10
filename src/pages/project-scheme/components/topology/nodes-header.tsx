import { Button, Space } from 'antd';
import { CaretUpFilled, CaretDownFilled, PlusOutlined } from '@ant-design/icons';
import { Text } from 'components/typography';

import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { COLORS } from 'helpers/constants';
import { FC } from "react";
import { VerticalSpace } from 'components/space/vertical-space';
import styled from 'styled-components';

const ColapseNode = styled(Button)`
  padding: 0;
`;

type NodesHeaderType = FC<{ visible: boolean }>;

export const NodesHeader: NodesHeaderType = ({ visible }) => {
  const { startAddType } = useDataSheetWrapper();

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
            // onClick={() => setVisible((prev) => !prev)}
          >
            <Text>Node Type</Text>
          </ColapseNode>
        </Space>
        <PlusOutlined style={{ cursor: 'pointer' }} onClick={startAddType} />
      </Space>
    </VerticalSpace>
  );
};
