import React from 'react';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Modal } from 'antd';
import { AddSchemaTypeForm } from '../../form/add-type-form';

export const AddTypeModal: React.FC = () => {
  const { graph, setOpenAddType, isOpenTypeModal } = useSchema() || {};

  const onCancel = () => {
    setOpenAddType(undefined);
    graph.container.style.cursor = '';
  }

  return (
    <Modal centered onCancel={onCancel} open={isOpenTypeModal} footer={false}>
      <AddSchemaTypeForm onCancel={onCancel} />
    </Modal>
  );
};
