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
import { COLORS } from "helpers/constants";
import { useMoveProjectToAll } from "api/projects/use-move-project-to-all";
import { useState } from "react";
import { RequestTypes } from "api/types";
import { FOLDER_UPDATE_URL } from "api/folders/use-manage-folder";
import { CreateEditFolderModal, DeleteFolderModal } from "components/modal";

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

const menuItemStyle = { borderBottom: `1px solid ${COLORS.PRIMARY.GRAY_LIGHT}`, borderRadius: '0' };

const menuItems = (foldersList: FoldersList[]): MenuItem[] => [
    {
        key: '1',
        icon: <MoveTo />,
        children: foldersList?.map((item, index):MenuItem => ({
            key: item.key,
            style: item.type === FolderType.all ? menuItemStyle : {},
            icon: item.type === FolderType.folder ? <FolderFilled style={{ fontSize: '16px' }} /> : <ArrowRight style={{ fontSize: '14px' }} />,
            label: item.type === FolderType.folder ? <><SecondaryText title={item.name}>
                {item.name.length > 19 ? item.name.substring(0, 19) + '...' : item.name}
            </SecondaryText>{item.count && <SecondaryText>({item.count})</SecondaryText>}</>
            : <>
                <SecondaryText>
                    {item.name}
                </SecondaryText>
            </>,
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

const menuItemsFolder: MenuItem[] = [
    {
        key: 'edit',
        icon: <Edit />,
        label: <MenuText>Edit</MenuText>,
    },
    {
        key: 'delete',
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
    folderId?: string;
};

/* forceSubMenuRender - set condiotn when popover become visible this will become true */
export const ProjectActionMenu = ({ foldersList, projectId, folderId }: Props) => {
    const { mutate } = useMoveProjectTo(folderId);
    const { mutate: mutateAll } = useMoveProjectToAll(folderId);
    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'all') {
            mutateAll({ projectId });
            return;
        }
        mutate({ projectId, folderId: e.key });
      };

    return <Menu
        style={{ width: 256 }}
        mode="vertical"
        items={menuItems(foldersList)} 
        forceSubMenuRender={false}
        onClick={onClick}
    />
};

type PropsFolder = {
    countItems: number;
    folderName: string;
    folderId: string;
};

export const FolderActionMenu = ({ folderName, folderId, countItems }: PropsFolder) => {
    console.log('countItems', countItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const onClick: MenuProps['onClick'] = (e) => {
        console.log(e.key);
        if (e.key === 'edit') {
            setIsModalOpen(true);
        } else if (e.key === 'delete') {
            setIsDeleteModalOpen(true);
        }
        e.domEvent.stopPropagation();
      };

    return <>
        <Menu
            style={{ width: 256 }}
            mode="vertical"
            items={menuItemsFolder} 
            forceSubMenuRender={false}
            onClick={onClick}
        />
        <DeleteFolderModal
            isModalOpen={isDeleteModalOpen} 
            setIsModalOpen={setIsDeleteModalOpen} 
            folderId={folderId}
            countItems={countItems}
        />
        <CreateEditFolderModal
            isModalOpen={isModalOpen} 
            setIsModalOpen={setIsModalOpen} 
            initialValue={folderName}
            type={RequestTypes.Put}
            url={FOLDER_UPDATE_URL.replace(':id', folderId)}
        />
    </>
};