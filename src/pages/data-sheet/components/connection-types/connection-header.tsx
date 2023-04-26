import { Button, Space } from 'antd';
import { CaretUpFilled, CaretDownFilled, PlusOutlined } from '@ant-design/icons';
import { Text } from 'components/typography';

import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropsSetState } from '../../types';
import { COLORS } from 'helpers/constants';
import { VerticalSpace } from 'components/space/vertical-space';
import { SearchIcon } from 'components/icon';

export const ConnectionHeader = ({ visible, setVisible, setSearchVisible }: PropsSetState) => {
  const { startAddType } = useDataSheetWrapper();

  return (
    <VerticalSpace>
      <Space size={8} style={{ width: '100%', padding: '24px 24px 0', justifyContent: 'space-between' }} align="center">
        <Space>
          <Button
            style={{ padding: 0 }}
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
            <Text>Connection type</Text>
          </Button>
          <SearchIcon setSearchActive={setSearchVisible} />
        </Space>
        <PlusOutlined style={{ cursor: 'pointer' }} onClick={startAddType} />
      </Space>
    </VerticalSpace>
  );
};
