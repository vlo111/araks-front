import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Layout as LayoutComponent, Tabs as TabsComponent } from 'antd';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import { PATHS } from 'helpers/constants';
import { useAuth } from 'context/auth-context';
import { HeaderSearch } from './components/header-search';
import { OverviewWrapper } from './components/overview/wrapper';
import { Logo } from 'components/logo';
import { DataSheetWrapper } from './components/data-sheet/wrapper';
import { stripTrailingSlash } from 'helpers/utils';

const Layout = styled(LayoutComponent)`
  background: #f2f2f2;
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
      border-color: transparent;
    }

    .ant-tabs-tab {
      height: 64px;

      &:not(.ant-tabs-tab-active) {
        border: none;
        background-color: transparent;
        background: transparent;
      }

      &.ant-tabs-tab-active {
        background: #f2f2f2;
        box-shadow: inset 3px 3px 9px rgba(111, 111, 111, 0.3);
        border-radius: 4px 4px 0px 0px;
      }
    }
  }
`;

export const Overview = () => {
  const { user } = useAuth();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const dataSheetKey = params.node_type_id ? PATHS.DATA_SHEET_NODE_TYPE : PATHS.DATA_SHEET;

  const items = useMemo(
    () => [
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
        key: dataSheetKey,
        label: 'Data sheet',
      },
      {
        key: '4',
        label: 'Visualisation',
        disabled: true,
      },
    ],
    [dataSheetKey]
  );

  const handleTabClick = useCallback(
    (key: string) => {
      navigate(key.replace(':id', params.id || ''));
    },
    [navigate, params.id]
  );

  const activeItem = useMemo(
    () =>
      items.find((item) => {
        return (
          item.key.replace(':id', params.id || '').replace(':node_type_id', params.node_type_id || '') ===
          stripTrailingSlash(location.pathname)
        );
      }),
    [items, location.pathname, params.id, params.node_type_id]
  );

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
        <div className="overview-tabs">
          <Tabs
            defaultActiveKey={activeItem?.key}
            activeKey={activeItem?.key}
            type="card"
            tabBarGutter={32}
            onTabClick={handleTabClick}
            items={items.map((item) => ({
              ...item,
              children: (
                <div className="site-layout-content">
                  {item.key === PATHS.PROJECT_OVERVIEW && <OverviewWrapper />}
                  {item.key === dataSheetKey && <DataSheetWrapper />}
                </div>
              ),
            }))}
          />
        </div>
      </Content>
    </Layout>
  );
};
