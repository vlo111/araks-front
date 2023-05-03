import { MenuProps } from 'antd';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { MenuText } from 'components/typography';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { PropertyMenu } from './property-menu';
import { DeleteConnectionTypePropertyModal } from 'components/modal/delete-connection-type-property-modal';
import './index.css';

type MenuItem = Required<MenuProps>['items'][number];

export enum FolderType {
  folder,
  all,
}

const menuItems: MenuItem[] = [
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

type Props = {
  propertyId: string;
};

export const ConnectionTypePropertyMenu = ({ propertyId }: Props) => {
  const { dispatch } = useTypeProperty();

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'edit') {
      dispatch({ type: TypePropertyActionKind.EDIT_CONNECTION_TYPE_START, payload: { propertyId } });
    } else if (e.key === 'delete') {
      dispatch({ type: TypePropertyActionKind.DELETE_CONNECTION_TYPE_START, payload: { propertyId } });
    }
    e.domEvent.stopPropagation();
  };

  return (
    <>
      <PropertyMenu
        style={{ width: 256 }}
        mode="vertical"
        items={menuItems}
        forceSubMenuRender={false}
        onClick={onClick}
      />
      <DeleteConnectionTypePropertyModal id={propertyId} />
    </>
  );
};
