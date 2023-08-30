import { useSchema } from 'components/layouts/components/schema/wrapper';
import { CSSProperties } from 'react';
import { Drawer } from 'components/drawer/perspective-drawer';
import { UserForm } from './form';
import { UserList } from './user-list';
import { Icon } from 'components/icon';
import { Col, Row } from 'antd';
import { Text } from 'components/typography';
import { PATHS } from 'helpers/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useIsXXlScreen } from 'hooks/use-breakpoint';

export const containerStyle = (isXXl: boolean | undefined): CSSProperties => ({
  position: 'fixed',
  width: '100%',
  overflow: 'hidden',
  zIndex: -1,
  top: isXXl ? '152px' : '130px',
  right: isXXl ? '600px' : '400px',
  height: `calc(100% - ${isXXl ? '152px' : '130px'})`,
});

export const Share = () => {
  const params = useParams();

  const isXXl = useIsXXlScreen();

  const navigate = useNavigate();

  const { perspective, startPerspectiveShare } = useSchema() || {};
  const onClose = () => startPerspectiveShare({ openShare: false, sharedUsers: [] });

  const visibility = perspective?.openShare ? 'inherit' : 'hidden';

  return (
    <div
      style={{
        ...containerStyle(isXXl),
        visibility,
      }}
    >
      <Drawer
        onClose={onClose}
        open={perspective?.openShare}
        contentWrapperStyle={{ width: isXXl ? '600px' : '400px' }}
      >
        <UserForm />
        <UserList />
        <Row
          style={{ marginTop: 'auto', cursor: 'pointer' }}
          onClick={() => {
            navigate(PATHS.PROJECT_OVERVIEW.replace(':id', params.id ?? ''));
          }}
        >
          <Col offset={14} span={2}>
            <Icon color="#353432" icon={'users'} size={25} />
          </Col>
          <Col span={8}>
            <Text style={{ textDecoration: 'underline', color: '#232F6A' }}>Share members</Text>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};
