import styled from 'styled-components';
import { Layout as LayoutComponent } from 'antd';
import { Navigate } from 'react-router-dom';

import { PATHS, screenSize } from 'helpers/constants';
import { useAuth } from 'context/auth-context';
import { HeaderSearch } from './components/header-search';
import { Logo } from 'components/logo';
import { OverviewProvider } from 'context/overview-context';
import { OverviewTabs } from 'components/tabs/overview-tabs';

const Layout = styled(LayoutComponent)`
  background: #f2f2f2;
  height: 100%;
  min-height: 100vh;
`;

const { Header: HeaderComponent, Content: ContentComponent } = LayoutComponent;

const Header = styled(HeaderComponent)`
  && {
    background: transparent;
    padding: 12px;
    @media (min-width: ${screenSize.xxl}) {
      padding: 32px 32px 15px;
    }
    height: 88px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Content = styled(ContentComponent)`
  padding: 0;
`;

export const Overview = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={PATHS.SIGN_IN} />;
  }

  return (
    <Layout className="layout">
      <Header id="overview-header">
        <Logo margin={screenSize.xxl ? '0' : '15px 0'} />
        <HeaderSearch />
      </Header>
      <Content>
        <OverviewProvider>
          <OverviewTabs />
        </OverviewProvider>
      </Content>
    </Layout>
  );
};
