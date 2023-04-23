import React, { Dispatch, SetStateAction } from 'react';
import { Form, Modal } from 'antd';
import { AddSchemaEdgeForm } from '../form/add-edge';

type Props = React.FC<{ open: boolean; cancel: Dispatch<SetStateAction<boolean>> }>;

export const AddEdgeModal: Props = ({ open, cancel }) => {
  const [form] = Form.useForm();

  const props = {
    centered: true,
    open: open,
    onCancel: () => {
      cancel(false);

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
