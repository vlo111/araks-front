import styled from 'styled-components';
import { Menu as MenuComponent, MenuProps } from 'antd';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { ReactComponent as SetAsDefault } from 'components/icons/set-as-default.svg';
import { MenuText } from 'components/typography';
import { DeleteTypePropertyModal } from 'components/modal/delete-type-property-modal';

import './index.css';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { COLORS } from 'helpers/constants';
import { useSetPropertyDefault } from 'api/project-node-type-property/use-set-property-default';

type MenuItem = Required<MenuProps>['items'][number];

export enum FolderType {
  folder,
  all,
}

const menuItems = (isDefault: boolean, propertyType: string) =>
  [
    {
      key: 'default',
      icon: <SetAsDefault />,
      label: <MenuText>Set as default property</MenuText>,
      disabled: isDefault || propertyType !== 'text',
    },
    {
      key: 'edit',
      icon: <Edit />,
      label: <MenuText>Edit</MenuText>,
    },
    {
      key: 'delete',
      icon: <Delete />,
      label: <MenuText>Delete</MenuText>,
      disabled: isDefault,
    },
  ] as MenuItem[];

const Menu = styled(MenuComponent)`
  background-color: transparent;

  &&.ant-menu-vertical {
    border-inline-end: none;
  }

  .ant-menu-title-content .ant-typography {
    color: ${COLORS.PRIMARY.BLUE};
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

    &.ant-menu-item-disabled {
      .ant-menu-title-content .ant-typography {
        color: ${COLORS.PRIMARY.GRAY};
      }

      svg path {
        fill: ${COLORS.PRIMARY.GRAY};
      }
    }
  }
`;

type Props = {
  propertyId: string;
  isDefault: boolean;
  propertyType: string;
};

export const TypePropertyMenu = ({ propertyId, isDefault, propertyType }: Props) => {
  const { dispatch } = useTypeProperty();
  const { mutate } = useSetPropertyDefault();
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'edit') {
      dispatch({ type: TypePropertyActionKind.EDIT_TYPE_START, payload: { propertyId } });
    } else if (e.key === 'delete') {
      dispatch({ type: TypePropertyActionKind.DELETE_TYPE_START, payload: { propertyId } });
    } else if (e.key === 'default') {
      mutate({ propertyId });
    }
    e.domEvent.stopPropagation();
  };

  return (
    <>
      <Menu
        style={{ width: 256 }}
        mode="vertical"
        items={menuItems(isDefault, propertyType)}
        forceSubMenuRender={false}
        onClick={onClick}
      />
      <DeleteTypePropertyModal id={propertyId} />
    </>
  );
};
