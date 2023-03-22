import { PopoverProps } from 'antd';
import { ActionDots } from 'components/actions/dots';
import { AddTypePropertyForm } from 'components/form/add-type-property-form';
import { AddNodeTypePopover } from 'components/popover';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import React, { useCallback, useMemo } from 'react';

type Props = PopoverProps & {
  propertyId: string;
};

export const EditTypeProprty = React.memo(({ children, propertyId, ...props }: Props) => {
  const {
    state: { editTypeisOpened, propertyId: editPropertyId },
    dispatch,
  } = useTypeProperty();

  const handlePropertyEditClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.EDIT_TYPE_START, payload: { propertyId } });
  }, [dispatch, propertyId]);

  const isOpened = useMemo(
    () => editPropertyId === propertyId && editTypeisOpened,
    [editPropertyId, editTypeisOpened, propertyId]
  );

  return (
    <>
      <AddNodeTypePopover
        content={<AddTypePropertyForm isEdit />}
        open={isOpened}
        trigger="click"
        onOpenChange={(open: boolean) => {
          !open && dispatch({ type: TypePropertyActionKind.EDIT_TYPE_FINISH, payload: {} });
          return open;
        }}
        {...props}
      >
        <ActionDots style={{ position: 'absolute', right: '5px' }} onClick={handlePropertyEditClick} />
      </AddNodeTypePopover>
      {children}
    </>
  );
});
