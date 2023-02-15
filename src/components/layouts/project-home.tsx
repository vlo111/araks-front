import React from 'react';
import styled from 'styled-components';
import { Layout as LayoutComponent, Menu as MenuComponent } from 'antd';
import { Outlet } from "react-router-dom";

import { MenuText } from '../typography';
import { ReactComponent as Home } from '../icons/home.svg';
import { ReactComponent as Logo } from '../icons/araks.svg';
import { ReactComponent as Public } from '../icons/public.svg';
import { ReactComponent as Shared } from '../icons/shared.svg';

const Layout = styled(LayoutComponent)`
    background: #F2F2F2;
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
        padding: 32px 50px;
        height: 104px;
        box-shadow: 10px 6px 10px rgba(111, 111, 111, 0.1);
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
        label: 'Home'
    },
    {
        icon: <Public />,
        label: 'Public'
    },
    {
        icon: <Shared />,
        label: 'Shared'
    }
];

export const ProjectHome = () => {
//   const { user } = useAuth();

//   if (user) {
//     return <Navigate to="/dashboard" />;
//   }

  return (
    <Layout>
      <Sider
        width={240}
        // breakpoint="lg"
        // collapsedWidth="0"
        // onBreakpoint={(broken) => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <Logo style={{margin: '31px 63px'}} />
        <Menu
          mode="inline"
          inlineIndent={63}
          defaultSelectedKeys={['1']}
          items={menu.map(
            (item, index) => ({
              key: String(index + 1),
              icon: item.icon,
              label: <MenuText>{item.label}</MenuText>,
            }),
          )}
        />
      </Sider>
      <LayoutInner>
        <Header />
        <Content>
            <Outlet />
        </Content>
      </LayoutInner>
    </Layout>
  )
};