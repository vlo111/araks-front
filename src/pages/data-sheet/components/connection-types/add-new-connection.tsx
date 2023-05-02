import { PlusOutlined } from '@ant-design/icons';
import { AddTypePropertyForm } from 'components/form/add-type-property-form';
import { AddNodeTypePopover } from 'components/popover';
import { useCallback } from 'react';
import { useTypeProperty } from '../table-section/table-context';
import { TypePropertyActionKind } from '../table-section/types';

export const AddNewConnection = () => {
  const { dispatch, state } = useTypeProperty();

  const handleExtraClick = (event: React.MouseEvent<HTMLElement>, action: () => void) => {
    event.stopPropagation();
    action();
  };

  const handlePropertyAddClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.CREATE_CONNECTION, payload: { isConnectionType: true } });
  }, [dispatch]);
  return (
    <AddNodeTypePopover
      content={<AddTypePropertyForm />}
      trigger="click"
      open={state.isConnectionType}
      placement="right"
    >
      <PlusOutlined
        style={{ cursor: 'pointer' }}
        onClick={(event) => handleExtraClick(event, handlePropertyAddClick)}
      />
    </AddNodeTypePopover>
  );
};
