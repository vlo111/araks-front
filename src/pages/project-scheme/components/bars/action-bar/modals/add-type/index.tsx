import React from 'react';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import {Form, Modal} from 'antd';
import { AddSchemaTypeForm } from '../../form/add-type-form';
import {Node} from "@antv/x6";

export const AddTypeModal: React.FC = () => {
  const { addTypeModal, setAddTypeModal, selectedNode } = useSchema() || {};
  const [form] = Form.useForm();

  const props = {
    centered: true,
    open: addTypeModal !== undefined,
    onCancel: () => {
      setAddTypeModal(undefined)

      const type = selectedNode as Node<Node.Properties>;

      if (!(selectedNode instanceof Node<Node.Properties>)) {
        form.resetFields();
      } else {
        form.setFieldsValue({
          name: type.attr('text/text'),
          color: type.attr('body/stroke'),
          parent_id: type.attr('parentId'),
        })
      }
    },
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaTypeForm form={form} onCancel={props.onCancel} />
    </Modal>
  );
};
