import { PopoverProps } from 'antd';
import { ActionDots } from 'components/actions/dots';
import { AddTypePropertyForm } from 'components/form/add-type-property-form';
import { TypePropertyMenu } from 'components/menu/type-property-menu';
import { AddNodeTypePopover, ManageNodeTypePopover } from 'components/popover';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import React, { useCallback, useMemo } from 'react';

type Props = PopoverProps & {
  propertyId: string;
  isDefault: boolean;
  canSetDefault: boolean;
};

export const ManageTypeProperty = React.memo(({ children, propertyId, isDefault, canSetDefault, ...props }: Props) => {
  const {
    state: { manageTypeisOpened, propertyId: editPropertyId, editTypeisOpened },
    dispatch,
  } = useTypeProperty();

  const handlePropertyEditClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.MANAGE_TYPE_START, payload: { propertyId } });
  }, [dispatch, propertyId]);

  const isOpened = useMemo(
    () => editPropertyId === propertyId && manageTypeisOpened,
    [editPropertyId, manageTypeisOpened, propertyId]
  );

  const isEditOpened = useMemo(
    () => editPropertyId === propertyId && editTypeisOpened,
    [editPropertyId, editTypeisOpened, propertyId]
  );

  return (
    <>
      <ManageNodeTypePopover
        content={<TypePropertyMenu isDefault={isDefault} propertyId={propertyId} canSetDefault={canSetDefault} />}
        open={isOpened}
        trigger="click"
        onOpenChange={(open: boolean) => {
          !open && dispatch({ type: TypePropertyActionKind.MANAGE_TYPE_FINISH, payload: {} });
          return open;
        }}
        {...props}
      >
        <ActionDots style={{ position: 'absolute', right: '5px' }} onClick={handlePropertyEditClick} />
      </ManageNodeTypePopover>
      <AddNodeTypePopover
        content={<AddTypePropertyForm isEdit />}
        open={isEditOpened}
        trigger="click"
        onOpenChange={(open: boolean) => {
          !open && dispatch({ type: TypePropertyActionKind.EDIT_TYPE_FINISH, payload: {} });
          return open;
        }}
        {...props}
      >
        {children}
      </AddNodeTypePopover>
    </>
  );
});
