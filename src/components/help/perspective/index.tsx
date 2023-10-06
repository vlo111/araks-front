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
  sub6: {
    content: (
      <>
        <Title level={5}>Perspective</Title>

        <ul style={{ color: '#808080' }}>
          <li>Click to the <b>+</b> button and Add New perspective</li>
          <li>Open the “Eye” of the Type for sharing (For all types, share the Main perspective)</li>
          <li>
            Click to the Share button and the system will open “Share” drawer:
            <ul>
              <li>Click the Dropdown and choose the Perspective</li>
              <li>Write User email</li>
              <li>Choose the role </li>
              <li>Click the Send Invite button</li>
            </ul>
          </li>
          <li>Click See all members and navigate to the all members page </li>
        </ul>
        <Row gutter={8}>
          <Col span={12}>
            <Image src={MainPerspective} />
          </Col>
          <Col span={12}>
            <Image src={AddNewPerspective} />
          </Col>
          <Col span={12}>
            <Image src={NewPerspective} />
          </Col>
          <Col span={12}>
            <Image src={SharePerspective} />
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
