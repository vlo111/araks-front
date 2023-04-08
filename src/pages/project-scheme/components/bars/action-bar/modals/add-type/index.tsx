import React from 'react';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import {Form, Modal} from 'antd';
import { AddSchemaTypeForm } from '../../form/add-type-form';

export const AddTypeModal: React.FC = () => {
  const { addTypeModal, setAddTypeModal } = useSchema() || {};
  const [form] = Form.useForm();

  const props = {
    centered: true,
    open: addTypeModal !== undefined,
    onCancel: () => {
      setAddTypeModal(undefined)
      form.resetFields();
    },
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaTypeForm form={form} />
    </Modal>
  );
};
