import React from 'react';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Modal } from 'antd';
import { AddSchemaTypeForm } from '../../form/add-type-form';

export const AddLinkModal: React.FC = () => {
  const { setOpenAddType, isOpenTypeModal } = useSchema() || {};

  return (
    <Modal centered onCancel={() => setOpenAddType(undefined)} open={isOpenTypeModal} footer={false}>
      <AddSchemaTypeForm />
    </Modal>
  );
};
