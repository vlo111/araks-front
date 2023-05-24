import React from 'react';
import { Form } from 'antd';
import { AddSchemaEdgeForm } from '../form/add-edge';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Modal } from 'components/modal';

export const AddEdgeModal: React.FC = () => {
  const [form] = Form.useForm();
  const { addLinkModal, setAddLinkModal } = useSchema() || {};

  const props = {
    centered: true,
    open: addLinkModal !== undefined,
    onCancel: () => {
      setAddLinkModal(undefined);
      form.resetFields();
    },
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaEdgeForm form={form} onCancel={props.onCancel} />
    </Modal>
  );
};
