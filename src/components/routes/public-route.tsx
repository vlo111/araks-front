import { Col, Layout as LayoutComponent, Row } from 'antd';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import { Logo } from 'components/logo';
import { HelpVisualization } from 'pages/sign-in/components/help-visualization';

const Layout = styled(LayoutComponent)`
  background: #fdfdfd;
`;

const { Header: HeaderComponent, Content: ContentComponent } = LayoutComponent;

const Header = styled(HeaderComponent)`
  && {
    background: transparent;
    padding: 32px 50px;
    height: 107px;
  }
`;

const Content = styled(ContentComponent)`
  padding: 0 50px;
  margin-left: auto;
  margin-right: auto;
  width: 448px;
`;

export const PublicRoutes = () => {

  return (
    <Layout>
      <Row>
        <Col span={12}>
          <Header>
            <Logo />
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Col>
        <Col span={12}>
          <HelpVisualization />
        </Col>
      </Row>
    </Layout>
  );
};
