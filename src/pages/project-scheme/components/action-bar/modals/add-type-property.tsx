import React from 'react';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddSchemaTypePropertyForm } from '../form/add-type-property/add-type-property';
import { Modal } from 'components/modal';

export const AddTypePropertyModal: React.FC = () => {
  const { type_port, finishTypePort } = useSchema() || {};

  const props = {
    open: type_port?.isOpened,
    footer: false,
    centered: true,
    onCancel: finishTypePort,
  };

  return (
    <Modal {...props}>
      <AddSchemaTypePropertyForm />
    </Modal>
  );
};
