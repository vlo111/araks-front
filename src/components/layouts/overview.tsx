import React from 'react';
import styled from 'styled-components';
import { Badge, Layout as LayoutComponent, Menu as MenuComponent, MenuProps, Space, Tabs } from 'antd';
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { MenuText } from '../typography';
import { ReactComponent as Home } from '../icons/home.svg';
import { ReactComponent as Logo } from '../icons/araks.svg';
import { ReactComponent as Public } from '../icons/public.svg';
import { ReactComponent as Shared } from '../icons/shared.svg';
import { ReactComponent as Bell } from '../icons/bell.svg';

import { Search } from 'components/search';
import { PATHS } from 'helpers/constants';
import { useAuth } from 'context/auth-context';
import { HeaderProfile } from 'components/header-profile';
import { HeaderSearch } from './components/header-search';

const Layout = styled(LayoutComponent)`
    background: #F2F2F2;
    height: 100%;
    min-height: 100vh;
`;

const Menu = styled(MenuComponent)`
    background: transparent;

    .ant-menu-item {
        margin: 0;
        width: 100%;
        height: 56px;

        &.ant-menu-item-selected {
            background: #414141;

            .ant-typography {
                color: #ffffff;
            }

            svg {
                fill: #ffffff;
            }
        }
    }
`;

const LayoutInner = styled(LayoutComponent)`
    background: #F2F2F2;
    box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);
    border-radius: 4px;
`;

const { Header: HeaderComponent, Content: ContentComponent, Sider: SiderComponent } = LayoutComponent;

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
    padding: 34px 40px;
`;

const Sider = styled(SiderComponent)`
    && {
        background: transparent;
    }
`;


const menu = [
    {
        icon: <Home />,
        label: 'Home',
        key: PATHS.PROJECTS
    },
    {
        icon: <Public />,
        label: 'Public',
        key: PATHS.PUBLIC
    },
    {
        icon: <Shared />,
        label: 'Shared',
        key: 'shared'
    }
];

export const Overview = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to={PATHS.SIGN_IN} />;
  }

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const defaultSelected = location.pathname === PATHS.PUBLIC ? PATHS.PUBLIC : PATHS.PROJECTS; 

  return (
    <Layout className="layout">
      <Header>
        <Logo />
        <HeaderSearch />
      </Header>
      <Content>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Tabs
        defaultActiveKey="1"
        type="card"
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Card Tab ${id}`,
            key: id,
            children: `Content of card tab ${id}`,
          };
        })}
      />
        <div className="site-layout-content" style={{ background: 'red' }}>
          Content
        </div>
      </Content>
    </Layout>
  )
};