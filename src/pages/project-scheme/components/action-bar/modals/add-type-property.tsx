import React from 'react';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddSchemaTypePropertyForm } from '../form/add-property-type';
import { Modal } from 'components/modal';

export const AddTypePropertyModal: React.FC = () => {
  const { port, finishPort } = useSchema() || {};

  const props = {
    open: port?.isOpened,
    footer: false,
    centered: true,
    onCancel: finishPort,
  };

  return (
    <Modal {...props}>
      <AddSchemaTypePropertyForm />
    </Modal>
  );
};
