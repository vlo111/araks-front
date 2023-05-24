import React from 'react';
import { AddSchemaEdgeForm } from '../form/add-edge';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Modal } from 'components/modal';

export const AddEdgeModal: React.FC = () => {
  const { finishEdgeType: onCancel, edge } = useSchema() || {};

  const props = {
    centered: true,
    open: edge?.isOpened,
    onCancel,
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaEdgeForm onCancel={onCancel} />
    </Modal>
  );
};
