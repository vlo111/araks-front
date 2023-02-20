import { Menu as MenuComponent, MenuProps } from "antd";
import { FolderFilled } from '@ant-design/icons';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { ReactComponent as MoveTo } from 'components/icons/move-to.svg';
import { ReactComponent as ArrowRight } from 'components/icons/arrow-right.svg';
import { MenuText, Text } from "components/typography";
import styled from "styled-components";

import './index.css';
import { useCallback } from "react";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    popupClassName?: string,
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label: <MenuText>{label}</MenuText>,
      type,
      popupClassName,
      popupOffset: [-25],
      defaultOpenKeys: 'sub11'
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Move To', 'sub1', <MoveTo />, [
      getItem('Item 1', 'sub11', <FolderFilled style={{ fontSize: '16px' }} />),
      getItem('Item 2', null, null),
    ], 'project-menu-action'),
  
    getItem('Edit', 'sub2', <Edit />),
  
    getItem(' Delete', 'sub4', <Delete />),
  ];

export enum FolderType {
    folder,
    all
};
type FoldersList = {
    count?: number;
    name: string,
    key: string,
    type: FolderType
};

const menuItems = (foldersList: FoldersList[]): MenuItem[] => [
    {
        key: '1',
        icon: <MoveTo />,
        children: foldersList.map((item, index):MenuItem => ({
            key: item.key,
            icon: item.type === FolderType.folder ? <FolderFilled style={{ fontSize: '16px' }} /> : <ArrowRight style={{ fontSize: '16px' }} />,
            label: <><Text>{item.name}</Text>{item.count && <Text>({item.count})</Text>}</>,
        })),
        label: <MenuText>Move To</MenuText>,
        popupClassName: 'project-menu-action',
        popupOffset: [-25],
    },
    {
        key: '2',
        icon: <Edit />,
        label: <MenuText>Edit</MenuText>,
    },
    {
        key: '3',
        icon: <Delete />,
        label: <MenuText>Delete</MenuText>,
    }
];


const Menu = styled(MenuComponent)`
    background-color: transparent;

    .ant-menu-submenu .ant-menu-submenu-title, .ant-menu-item {
        margin: 4px 0;
        width: 100%;

        &:hover, &:active {
            background: linear-gradient(90deg, rgba(35, 47, 106, 0.2) 0%, rgba(35, 47, 106, 0.2) 100%);
            border: 1px solid #FFFFFF;
            transition: transform 0.15s;

        }
    }
`;

type Props = {
    foldersList: FoldersList[];
};

/* forceSubMenuRender - set condiotn when popover become visible this will become true */
export const ProjectActionMenu = ({ foldersList }: Props) => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
      };

    return <Menu
        style={{ width: 256 }}
        mode="vertical"
        items={menuItems(foldersList)} 
        forceSubMenuRender={false}
        onClick={onClick}
    />
};
