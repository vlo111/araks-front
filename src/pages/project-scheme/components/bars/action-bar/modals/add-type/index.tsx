import React from 'react';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Modal } from 'antd';
import { AddSchemaTypeForm } from '../../form/add-type-form';

export const AddTypeModal: React.FC = () => {
  const { addTypeModal, setAddTypeModal } = useSchema() || {};

  const props = {
    centered: true,
    open: addTypeModal !== undefined,
    onCancel: () => setAddTypeModal(undefined),
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaTypeForm />
    </Modal>
  );
};
