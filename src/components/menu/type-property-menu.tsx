import styled from 'styled-components';
import { Menu as MenuComponent, MenuProps } from 'antd';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { MenuText } from 'components/typography';
import { DeleteTypePropertyModal } from 'components/modal/delete-type-property-modal';

import './index.css';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';

type MenuItem = Required<MenuProps>['items'][number];

export enum FolderType {
  folder,
  all,
}

const menuItems = (isDefault: boolean) =>
  [
    {
      key: 'edit',
      icon: <Edit />,
      label: <MenuText>Edit</MenuText>,
    },
    ...(!isDefault
      ? [
          {
            key: 'delete',
            icon: <Delete />,
            label: <MenuText>Delete</MenuText>,
          },
        ]
      : []),
  ] as MenuItem[];

const Menu = styled(MenuComponent)`
  background-color: transparent;

  &&.ant-menu-vertical {
    border-inline-end: none;
  }

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
  propertyId: string;
  isDefault: boolean;
};

export const TypePropertyMenu = ({ propertyId, isDefault }: Props) => {
  const { dispatch } = useTypeProperty();
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'edit') {
      dispatch({ type: TypePropertyActionKind.EDIT_TYPE_START, payload: { propertyId } });
    } else if (e.key === 'delete') {
      dispatch({ type: TypePropertyActionKind.DELETE_TYPE_START, payload: { propertyId } });
    }
    e.domEvent.stopPropagation();
  };

  return (
    <>
      <Menu
        style={{ width: 256 }}
        mode="vertical"
        items={menuItems(isDefault)}
        forceSubMenuRender={false}
        onClick={onClick}
      />
      <DeleteTypePropertyModal id={propertyId} />
    </>
  );
};
