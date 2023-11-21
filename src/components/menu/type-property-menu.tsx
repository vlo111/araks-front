import { MenuProps } from 'antd';
import { ReactComponent as Delete } from 'components/icons/delete.svg';
import { ReactComponent as Edit } from 'components/icons/edit-pencil.svg';
import { MenuText } from 'components/typography';
import { DeleteTypePropertyModal } from 'components/modal/delete-type-property-modal';

import './index.css';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { useSetPropertyDefault } from 'api/project-node-type-property/use-set-property-default';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropertyMenu } from './property-menu';
import { AddNodeTypePopover } from 'components/popover';
import { AddTypePropertyForm } from 'components/form/type-property/add-type-property-form';
import { useState } from 'react';
import { ProgressBar } from '../progress-bar';
import { useImport } from '../../context/import-context';

type MenuItem = Required<MenuProps>['items'][number];

export enum FolderType {
  folder,
  all,
}

const menuItems = (isDefault: boolean, canSetDefault: boolean) =>
  [
    // TODO: no need for now
    // {
    //   key: 'default',
    //   icon: <SetAsDefault />,
    //   label: <MenuText>Set as default property</MenuText>,
    //   disabled: isDefault || !canSetDefault,
    // },
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

type Props = {
  propertyId: string;
  isDefault: boolean;
  canSetDefault: boolean;
  closeManageNodes: () => void;
};

export const TypePropertyMenu = ({ propertyId, isDefault, canSetDefault, closeManageNodes }: Props) => {
  const { dispatch } = useTypeProperty();
  const [isEditOpened, setEditOpened] = useState(false);
  const {
    state: { progressStart, progressStop },
  } = useImport();

  const { nodeTypeId } = useDataSheetWrapper();
  const { mutate } = useSetPropertyDefault();
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'edit') {
      dispatch({ type: TypePropertyActionKind.EDIT_TYPE_START, payload: { propertyId } });
      setEditOpened(true);
    } else if (e.key === 'delete') {
      dispatch({ type: TypePropertyActionKind.DELETE_TYPE_START, payload: { propertyId } });
    } else if (e.key === 'default' && nodeTypeId) {
      // Not used, set as default functionality blocked
      mutate({ propertyId, nodeTypeId: nodeTypeId });
    }
    closeManageNodes();
    e.domEvent.stopPropagation();
  };

  return (
    <>
      <PropertyMenu
        style={{ width: 256 }}
        mode="vertical"
        selectable={false}
        items={menuItems(isDefault, canSetDefault)}
        forceSubMenuRender={false}
        onClick={onClick}
      />
      <DeleteTypePropertyModal id={propertyId} />
      <AddNodeTypePopover
        content={<AddTypePropertyForm isEdit hide={() => setEditOpened(false)} propertyId={propertyId} />}
        open={isEditOpened}
        trigger="click"
        align={{ offset: [50, -150] }}
        onOpenChange={(open: boolean) => {
          !open && setEditOpened(false);
          return open;
        }}
      />
      <ProgressBar start={!!progressStart} stop={!!progressStop} />
    </>
  );
};
