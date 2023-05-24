import React from 'react';
import { AddSchemaEdgeForm } from '../form/add-edge';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Modal } from 'components/modal';

export const AddEdgeModal: React.FC = () => {
  const { addLinkModal, setAddLinkModal } = useSchema() || {};

  const props = {
    centered: true,
    open: addLinkModal?.open,
    onCancel: () => {
      setAddLinkModal({ ...addLinkModal, open: false });
    },
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaEdgeForm onCancel={props.onCancel} />
    </Modal>
  );
};
