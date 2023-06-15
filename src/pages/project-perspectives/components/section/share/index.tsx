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

export const containerStyle: CSSProperties = {
  position: 'fixed',
  height: 'calc(100% - 9.5rem)',
  width: '100%',
  right: '600px',
  top: '9.5rem',
  overflow: 'hidden',
  zIndex: -1,
};

export const Share = () => {
  const params = useParams();

  const navigate = useNavigate();

  const { perspective, startPerspectiveShare } = useSchema() || {};
  const onClose = () => startPerspectiveShare({ openShare: false, sharedUsers: [] });

  const visibility = perspective?.openShare ? 'inherit' : 'hidden';

  return (
    <div style={{ ...containerStyle, visibility }}>
      <Drawer onClose={onClose} open={perspective?.openShare}>
        <UserForm />
        <UserList />
        <Row
          style={{ marginTop: 'auto', cursor: 'pointer' }}
          onClick={() => {
            navigate(PATHS.PROJECT_OVERVIEW.replace(':id', params.id ?? ''));
          }}
        >
          <Col offset={16} span={2}>
            <Icon color="#353432" icon={'users'} size={25} />
          </Col>
          <Col span={6}>
            <Text style={{ textDecoration: 'underline', color: '#232F6A' }}>Share members</Text>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};
