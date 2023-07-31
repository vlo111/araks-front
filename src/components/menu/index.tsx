import { useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuComponent, MenuProps } from 'antd';
import { FolderFilled } from '@ant-design/icons';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { ReactComponent as MoveTo } from 'components/icons/move-to.svg';
import { ReactComponent as ArrowRight } from 'components/icons/arrow-right.svg';
import { MenuText, SecondaryText } from 'components/typography';
import styled from 'styled-components';

import { useMoveProjectTo } from 'api/projects/use-move-project-to';
import { COLORS, PATHS, VARIABLES } from 'helpers/constants';
import { useMoveProjectToAll } from 'api/projects/use-move-project-to-all';

import './index.css';

type MenuItem = Required<MenuProps>['items'][number];

export enum FolderType {
  folder,
  all,
}
type FoldersList = {
  count?: number;
  name: string;
  key: string;
  type: FolderType;
};

const menuItemStyle = { borderBottom: `1px solid ${COLORS.PRIMARY.GRAY_LIGHT}`, borderRadius: '0' };

const menuItems = (foldersList: FoldersList[], isSharedPage = false): MenuItem[] => [
  {
    key: '1',
    icon: <MoveTo />,
    disabled: isSharedPage,
    children: foldersList?.map(
      (item): MenuItem => ({
        key: item.key,
        style: item.type === FolderType.all ? menuItemStyle : {},
        icon:
          item.type === FolderType.folder ? (
            <FolderFilled style={{ fontSize: '16px' }} />
          ) : (
            <ArrowRight style={{ fontSize: '14px' }} />
          ),
        label:
          item.type === FolderType.folder ? (
            <>
              <SecondaryText title={item.name}>
                {item.name.length > VARIABLES.MAX_PROJECT_TITLE_LENGTH
                  ? item.name.substring(0, VARIABLES.MAX_PROJECT_TITLE_LENGTH) + '...'
                  : item.name}
              </SecondaryText>
              {<SecondaryText> ({item.count})</SecondaryText>}
            </>
          ) : (
            <>
              <SecondaryText>{item.name}</SecondaryText>
            </>
          ),
      })
    ),
    label: <MenuText>Move To</MenuText>,
    popupClassName: 'project-menu-action',
    popupOffset: [-25],
  },
  {
    key: 'edit',
    disabled: isSharedPage,
    icon: <Edit />,
    label: <MenuText>Edit</MenuText>,
  },
  {
    key: 'delete',
    icon: <Delete />,
    label: <MenuText>Delete</MenuText>,
  },
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
  },
];

const Menu = styled(MenuComponent)`
  background-color: transparent;

  .ant-menu-submenu .ant-menu-submenu-title,
  .ant-menu-item {
    margin: 4px 0;
    width: 100%;

    &:hover,
    &:active {
      background: linear-gradient(90deg, rgba(35, 47, 106, 0.2) 0%, rgba(35, 47, 106, 0.2) 100%);
      border: 1px solid #ffffff;
      transition: transform 0.15s;
    }
  }
`;

type Props = {
  foldersList: FoldersList[];
  projectId: string;
  folderId?: string;
  setIsDeleteModalOpen: () => void;
};

/* forceSubMenuRender - set condiotn when popover become visible this will become true */
export const ProjectActionMenu = ({ foldersList, projectId, folderId, setIsDeleteModalOpen }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate } = useMoveProjectTo(folderId);
  const { mutate: mutateAll } = useMoveProjectToAll(folderId);
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'edit') {
      navigate(PATHS.PROJECT_UPDATE.replace(':id', projectId));
      return;
    }
    if (e.key === 'delete') {
      setIsDeleteModalOpen();
      return;
    }
    if (e.key === 'all') {
      mutateAll({ projectId });
      return;
    }
    mutate({ projectId, folderId: e.key });
  };

  return (
    <>
      <Menu
        style={{ width: 256 }}
        mode="vertical"
        items={menuItems(foldersList, location.pathname === PATHS.SHARED)}
        forceSubMenuRender={false}
        onClick={onClick}
      />
    </>
  );
};

type PropsFolder = {
  setIsDeleteModalOpen: () => void;
  setIsEditModalOpen: () => void;
  folderName: string;
  folderId: string;
};

export const FolderActionMenu = ({ folderName, folderId, setIsDeleteModalOpen, setIsEditModalOpen }: PropsFolder) => {
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'edit') {
      setIsEditModalOpen();
    } else if (e.key === 'delete') {
      setIsDeleteModalOpen();
    }
    e.domEvent.stopPropagation();
  };

  return (
    <Menu style={{ width: 256 }} mode="vertical" items={menuItemsFolder} forceSubMenuRender={false} onClick={onClick} />
  );
};
