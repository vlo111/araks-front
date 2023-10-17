import React from 'react';
import { Col, Image, Row, Typography } from 'antd';
import MainPerspective from 'components/help/images/main-perspective.svg';
import AddNewPerspective from 'components/help/images/add-new-perspective.svg';
import NewPerspective from 'components/help/images/new-perspective.svg';
import SharePerspective from 'components/help/images/share-perspective.svg';

interface MenuItem {
  content: JSX.Element;
  image?: JSX.Element;
}
const { Title } = Typography;

const menuItems: Record<string, MenuItem> = {
  'sub6-1': {
    content: (
      <>
        <Title
          style={{
            marginTop: 0,
            paddingLeft: '20px',
            fontSize: '18px',
          }}
        >
          Add, Edit and Delete Perspective
        </Title>
        <ul style={{ color: '#808080' }}>
          <li>
            Click to the <b>+</b> button and Add New perspective
          </li>
          <li>Open the “Eye” of the Type for sharing (For all types, share the Main perspective)</li>
          <li>
            Click to the <b>Share</b> button and the system will open “Share” drawer:
            <ul>
              <li>Click the Dropdown and choose the Perspective</li>
              <li>Write User email</li>
              <li>Choose the role </li>
              <li>
                Click the <b>Send Invite</b> button
              </li>
            </ul>
          </li>
          <li>
            Click <b>See all members</b> and navigate to the all members page{' '}
          </li>
          <li>The owner can change or delete role of the User</li>
          <li>
            Click to the <b>Setting</b> button and off the setting click <b>Delete</b> Icon and the perspective will be
            deleted
          </li>
        </ul>
        <Row gutter={8}>
          <Col span={12}>
            <Image wrapperStyle={{ display: 'block' }} src={MainPerspective} />
          </Col>
          <Col span={12}>
            <Image wrapperStyle={{ display: 'block' }} src={AddNewPerspective} />
          </Col>
          <Col span={12}>
            <Image wrapperStyle={{ display: 'block' }} src={NewPerspective} />
          </Col>
          <Col span={12}>
            <Image wrapperStyle={{ display: 'block' }} src={SharePerspective} />
          </Col>
        </Row>
      </>
    ),
  },
};

interface PerspectiveProps {
  activeMenuItem: string;
}

export const Perspective: React.FC<PerspectiveProps> = ({ activeMenuItem }) => {
  const menuItem = menuItems[activeMenuItem];

  if (menuItem) {
    return (
      <div style={{ fontSize: '16px' }}>
        {menuItem.content}
        {menuItem.image}
      </div>
    );
  }

  return null;
};
