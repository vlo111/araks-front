import { useState } from 'react';
import { MenuProps } from 'antd';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { MenuText } from 'components/typography';
import { PropertyMenu } from './property-menu';
import { AddNodeTypePopover } from 'components/popover';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { EditConnectionTypePropertyForm } from 'components/form/edit-connection-type-property-form';
import { DeleteConnectionTypeModal } from 'components/modal/delete-connection-type-modal';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import './index.css';

type MenuItem = Required<MenuProps>['items'][number];

export enum FolderType {
  folder,
  all,
}

const menuItems = () =>
  [
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
  ] as MenuItem[];

type Props = {
  connectionData: EdgeTypePropertiesResponse;
  closeManageNodes: () => void;
};

export const EditConnectionTypePropertyMenu = ({ connectionData, closeManageNodes }: Props) => {
  const { dispatch } = useTypeProperty();
  const [isEditOpened, setEditOpened] = useState(false);

  // const { nodeTypeId } = useDataSheetWrapper();
  // const { mutate } = useSetPropertyDefault();
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'edit') {
      dispatch({ type: TypePropertyActionKind.EDIT_TYPE_START, payload: { propertyId: connectionData.id } });
      setEditOpened(true);
    } else if (e.key === 'delete') {
      dispatch({ type: TypePropertyActionKind.DELETE_TYPE_START, payload: { propertyId: connectionData.id } });
    }
    closeManageNodes();
    e.domEvent.stopPropagation();
  };

  return (
    <>
      <PropertyMenu
        style={{ width: 256 }}
        mode="vertical"
        items={menuItems()}
        forceSubMenuRender={false}
        onClick={onClick}
      />
      <DeleteConnectionTypeModal id={connectionData.id} />
      <AddNodeTypePopover
        content={<EditConnectionTypePropertyForm connectionData={connectionData} hide={() => setEditOpened(false)} />}
        open={isEditOpened}
        trigger="click"
        onOpenChange={(open: boolean) => {
          !open && setEditOpened(false);
          return open;
        }}
      />
    </>
  );
};
