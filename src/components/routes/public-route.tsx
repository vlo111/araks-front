import { Layout as LayoutComponent } from 'antd';
import { Outlet } from "react-router-dom";

import { ReactComponent as Logo } from '../icons/araks.svg';
import styled from 'styled-components';
// import { useAuth } from "../hooks/useAuth";

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
`;

export const PublicRoutes = () => {
//   const { user } = useAuth();

//   if (user) {
//     return <Navigate to="/dashboard" />;
//   }

  return (
    <Layout>
      <Header>
        <Logo />
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
};