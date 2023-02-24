import { Menu as MenuComponent, MenuProps } from "antd";
import { FolderFilled } from '@ant-design/icons';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { ReactComponent as MoveTo } from 'components/icons/move-to.svg';
import { ReactComponent as ArrowRight } from 'components/icons/arrow-right.svg';
import { MenuText, SecondaryText } from "components/typography";
import styled from "styled-components";

import './index.css';
import { useMoveProjectTo } from "api/projects/use-move-project-to";

type MenuItem = Required<MenuProps>['items'][number];

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
        children: foldersList?.map((item, index):MenuItem => ({
            key: item.key,
            icon: item.type === FolderType.folder ? <FolderFilled style={{ fontSize: '16px' }} /> : <ArrowRight style={{ fontSize: '16px' }} />,
            label: <><SecondaryText title={item.name}>{item.name.length > 19 ? item.name.substring(0, 19) + '...' : item.name}</SecondaryText>{item.count && <SecondaryText>({item.count})</SecondaryText>}</>,
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
    projectId: string;
};

/* forceSubMenuRender - set condiotn when popover become visible this will become true */
export const ProjectActionMenu = ({ foldersList, projectId }: Props) => {
    const { mutate } = useMoveProjectTo()
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e.key, projectId);
        mutate({ projectId, folderId: e.key })
      };

    return <Menu
        style={{ width: 256 }}
        mode="vertical"
        items={menuItems(foldersList)} 
        forceSubMenuRender={false}
        onClick={onClick}
    />
};
