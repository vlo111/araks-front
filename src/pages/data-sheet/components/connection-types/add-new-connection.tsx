import { PlusOutlined } from '@ant-design/icons';
import { AddTypePropertyForm } from 'components/form/add-type-property-form';
import { AddNodeTypePopover } from 'components/popover';
import { useCallback, useState } from 'react';
import { useTypeProperty } from '../table-section/table-context';
import { TypePropertyActionKind } from '../table-section/types';

export const AddNewConnection = () => {
  const [open, setOpen] = useState(false);
  const { dispatch } = useTypeProperty();

  const handleExtraClick = (event: React.MouseEvent<HTMLElement>, action: () => void) => {
    event.stopPropagation();
    action();
    setOpen(true);
  };

  const handlePropertyAddClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.CREATE_CONNECTION, payload: { isConnectionType: true } });
  }, [dispatch]);
  return (
    <AddNodeTypePopover
      content={<AddTypePropertyForm hide={() => setOpen(false)} />}
      trigger="click"
      open={open}
      placement="right"
      onOpenChange={(open: boolean) => {
        !open && setOpen(false);
        return open;
      }}
    >
      <PlusOutlined
        style={{ cursor: 'pointer' }}
        onClick={(event) => handleExtraClick(event, handlePropertyAddClick)}
      />
    </AddNodeTypePopover>
  );
};
