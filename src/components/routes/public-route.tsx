import { Col, Layout as LayoutComponent, Row } from 'antd';
import { Navigate, Outlet } from "react-router-dom";

import { ReactComponent as Logo } from '../icons/araks.svg';
import styled from 'styled-components';
import { COLORS, PATHS } from 'helpers/constants';
import { useAuth } from 'context/auth-context';

const Layout = styled(LayoutComponent)`
    background: #FDFDFD;
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
  const { user } = useAuth();

  if (user) {
    return <Navigate to={PATHS.PROJECTS} />;
  }

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
        <Col span={12} style={{ backgroundColor: COLORS.PRIMARY.GRAY_LIGHT }}></Col>
      </Row>
      
    </Layout>
  )
};