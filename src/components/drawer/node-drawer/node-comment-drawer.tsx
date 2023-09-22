import { RightOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, DrawerProps, Row, Space, Spin } from 'antd';
import { useGetNodeCommentsCount } from 'api/comments/use-get-node-comments-count';
import { Icon } from 'components/icon';
import { NotifyBadge } from 'components/notifications';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { useGetHeaderHeight } from 'hooks/use-get-header-height';
import { useState } from 'react';

type Props = Partial<DrawerProps> & {
  nodeId?: string;
};

export const NodeCommentDrawer = ({ children, nodeId, ...props }: Props) => {
  const sectionHeight = useGetHeaderHeight();
  const { data: commentsCount, isInitialLoading: commentsCountIsLoading } = useGetNodeCommentsCount(nodeId);

  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <NotifyBadge
        color="#F97070"
        count={commentsCountIsLoading ? <Spin tip="Loading" size="small" /> : commentsCount}
        offset={[-5, 10]}
      >
        <Button
          type="link"
          onClick={() => setOpenDrawer(true)}
          icon={<Icon color="#414141" icon="chat_bubble_outline_black" size={24} />}
        />
      </NotifyBadge>
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
          backdropFilter: 'blur(14px)',
        }}
        mask={false}
        {...props}
      >
        {children}
      </Drawer>
    </>
  );
};
