import React from 'react';
import { Modal } from 'antd';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { AddSchemaTypePropertyForm } from '../form/add-property-type';

export const AddTypePropertyModal: React.FC = () => {
  const { addPortModal, setAddPortModal } = useSchema() || {};

  const props = {
    open: addPortModal !== undefined,
    footer: false,
    centered: true,
    onCancel: () => {
      setAddPortModal(undefined);
    },
  };

  return (
    <Modal {...props}>
      <AddSchemaTypePropertyForm />
    </Modal>
  );
};
