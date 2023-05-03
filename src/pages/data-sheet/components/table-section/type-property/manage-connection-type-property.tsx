import { PopoverProps } from 'antd';
import { ActionDots } from 'components/actions/dots';
import { AddConnectionTypePropertyForm } from 'components/form/add-connection-type-property-form';
import { ConnectionTypePropertyMenu } from 'components/menu/connection-type-property-menu';
import { AddNodeTypePopover, ManageNodeTypePopover } from 'components/popover';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import React, { useCallback, useMemo } from 'react';

type Props = PopoverProps & {
  propertyId: string;
  isDefault: boolean;
  canSetDefault: boolean;
};

export const ManageConnectionTypeProperty = React.memo(
  ({ children, propertyId, isDefault, canSetDefault, ...props }: Props) => {
    const {
      state: { manageConnectionTypeisOpened, propertyId: editPropertyId, editConnectionTypeisOpened },
      dispatch,
    } = useTypeProperty();

    const handlePropertyEditClick = useCallback(() => {
      dispatch({ type: TypePropertyActionKind.MANAGE_CONNECTION_TYPE_START, payload: { propertyId } });
    }, [dispatch, propertyId]);

    const isOpened = useMemo(
      () => editPropertyId === propertyId && manageConnectionTypeisOpened,
      [editPropertyId, manageConnectionTypeisOpened, propertyId]
    );

    const isEditOpened = useMemo(
      () => editPropertyId === propertyId && editConnectionTypeisOpened,
      [editPropertyId, editConnectionTypeisOpened, propertyId]
    );

    return (
      <>
        <ManageNodeTypePopover
          content={<ConnectionTypePropertyMenu propertyId={propertyId} />}
          open={isOpened}
          trigger="click"
          onOpenChange={(open: boolean) => {
            !open && dispatch({ type: TypePropertyActionKind.MANAGE_CONNECTION_TYPE_FINISH, payload: {} });
            return open;
          }}
          {...props}
        >
          <ActionDots style={{ position: 'absolute', right: '5px' }} onClick={handlePropertyEditClick} />
        </ManageNodeTypePopover>
        <AddNodeTypePopover
          content={<AddConnectionTypePropertyForm isEdit />}
          open={isEditOpened}
          trigger="click"
          onOpenChange={(open: boolean) => {
            !open && dispatch({ type: TypePropertyActionKind.EDIT_CONNECTION_TYPE_FINISH, payload: {} });
            return open;
          }}
          {...props}
        >
          {children}
        </AddNodeTypePopover>
      </>
    );
  }
);
