import React from 'react';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddSchemaTypeForm } from '../form/add-type';
import { Modal } from 'components/modal';

export const AddTypeModal: React.FC = () => {
  const { addTypeModal, setAddTypeModal } = useSchema() || {};
  const props = {
    centered: true,
    open: addTypeModal !== undefined,
    onCancel: () => {
      setAddTypeModal(undefined);
    },
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaTypeForm onCancel={props.onCancel} />
    </Modal>
  );
};
