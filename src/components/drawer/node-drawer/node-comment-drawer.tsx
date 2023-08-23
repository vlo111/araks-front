import { RightOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, DrawerProps, Row, Space } from 'antd';
import { Icon } from 'components/icon';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { useEffect, useState } from 'react';

export const NodeCommentDrawer = ({ children, ...props }: Partial<DrawerProps>) => {
  const [sectionHeight, setSectionHeight] = useState('0');

  useEffect(() => {
    const headerHeight = document.getElementById('overview-header')?.clientHeight;
    const headerTabsHeight = document.querySelector('#overview-header-tabs .ant-tabs-nav')?.clientHeight;

    // Calculate the content height and set it to state
    const contentHeight = `calc(${headerHeight}px + ${headerTabsHeight}px )`;
    setSectionHeight(contentHeight);
  }, []);
  // eslint-disable-next-line no-console
  console.log('sectionHeight', sectionHeight);
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Button
        type="link"
        onClick={() => setOpenDrawer(true)}
        icon={<Icon color="#414141" icon="chat_bubble_outline_black" size={24} />}
      />
      <Drawer
        open={openDrawer}
        closable={false}
        destroyOnClose
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <Text color={COLORS.PRIMARY.GRAY_DARK}>Comments</Text>
            </Col>
            <Col>
              <Button type="link" onClick={() => setOpenDrawer(false)}>
                <Space>
                  <Text color={COLORS.PRIMARY.GRAY_DARK}>Back</Text>
                  <RightOutlined style={{ color: COLORS.PRIMARY.GRAY_DARK }} />
                </Space>
              </Button>
            </Col>
          </Row>
        }
        width={600}
        placement="right"
        rootClassName="add-node-drawer"
        drawerStyle={{
          borderRadius: '4px',
          border: '1px solid #FFF',
          background: 'linear-gradient(136deg, rgba(237, 239, 248, 0.90) 0%, rgba(237, 239, 248, 0.80) 100%)',
          boxShadow: '0px 10px 10px 0px rgba(141, 143, 166, 0.20)',
          backdropFilter: 'blur(7px)',
        }}
        contentWrapperStyle={{
          marginTop: sectionHeight,
          boxShadow: 'none',
        }}
        style={{
          background: 'transparent',
        }}
        mask={false}
        {...props}
      >
        {children}
      </Drawer>
    </>
  );
};
