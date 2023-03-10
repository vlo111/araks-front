import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Layout as LayoutComponent, Tabs as TabsComponent } from 'antd';
import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { PATHS } from 'helpers/constants';
import { useAuth } from 'context/auth-context';
import { HeaderSearch } from './components/header-search';
import { OverviewWrapper } from './components/overview/wrapper';
import { Logo } from 'components/logo';

const Layout = styled(LayoutComponent)`
    background: #F2F2F2;
    height: 100%;
    min-height: 100vh;
`;

const { Header: HeaderComponent, Content: ContentComponent } = LayoutComponent;

const Header = styled(HeaderComponent)`
    && {
        background: transparent;
        padding: 32px 32px 15px;
        height: 88px;
        display: flex;
        justify-content: space-between;
    }
`;

const Content = styled(ContentComponent)`
    padding: 0;

`;

const Tabs = styled(TabsComponent)`
  .ant-tabs-nav-wrap {
    justify-content: center;
  }

  .ant-tabs-nav {
    box-shadow: 0px 10px 10px rgba(111, 111, 111, 0.16);
    margin-bottom: 0;

    &::before {
      border-color: transparent;;
    }

    .ant-tabs-tab {
      height: 64px;
      
      &:not(.ant-tabs-tab-active) {
        border: none;
        background-color: transparent;
        background: transparent;
      }
      
      &.ant-tabs-tab-active {
        background: #F2F2F2;
        box-shadow: inset 3px 3px 9px rgba(111, 111, 111, 0.3);
        border-radius: 4px 4px 0px 0px;
      }
    }
  }
`;

const items = [
  {
    key: PATHS.PROJECT_OVERVIEW,
    label: 'Overview',
  },
  {
    key: PATHS.PROJECT_SCHEME,
    label: 'Scheme',
    disabled: true,
  },
  {
    key: PATHS.DATA_SHEET,
    label: 'Data sheet',
  },
  {
    key: '4',
    label: 'Visualisation',
    disabled: true,
  },
];

export const Overview = () => {
  const { user } = useAuth();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const handleTabClick = useCallback((key: string) => {
    navigate(key.replace(':id', params.id || ''));
  },[navigate, params.id]);

  const activeItem = useMemo(() => items.find(item => item.key.replace(':id', params.id || '') === location.pathname), []);


  if (!user) {
    return <Navigate to={PATHS.SIGN_IN} />;
  }
  
  return (
    <Layout className="layout">
      <Header>
        <Logo />
        <HeaderSearch />
      </Header>
      <Content>
        <div className='overview-tabs'>
          <Tabs
            defaultActiveKey={activeItem?.key}
            type="card"
            tabBarGutter={32}
            onTabClick={handleTabClick}
            items={items.map(
              item => ({
                ...item,  
                children: <div className='site-layout-content'>
                  {item.key === PATHS.PROJECT_OVERVIEW && <OverviewWrapper />}
                  {item.key === PATHS.DATA_SHEET && <Outlet />}
                </div>
              })
            )}
          />
        </div>
      </Content>
    </Layout>
  )
};