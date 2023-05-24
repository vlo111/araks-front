import React from 'react';
import { AddSchemaEdgeForm } from '../form/add-edge';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Modal } from 'components/modal';

export const AddEdgeModal: React.FC = () => {
  const { finishEdgeType, edge: { isOpened } = { isOpened: false } } = useSchema() || {};

  const props = {
    centered: true,
    open: isOpened,
    onCancel: finishEdgeType,
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaEdgeForm onCancel={props.onCancel} />
    </Modal>
  );
};
