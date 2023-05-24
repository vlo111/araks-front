import React from 'react';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddSchemaTypeForm } from '../form/add-type';
import { Modal } from 'components/modal';

export const AddTypeModal: React.FC = () => {
  const { type, finishType: onCancel } = useSchema() || {};
  const props = {
    centered: true,
    open: type?.isOpened,
    onCancel,
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaTypeForm onCancel={onCancel} />
    </Modal>
  );
};
