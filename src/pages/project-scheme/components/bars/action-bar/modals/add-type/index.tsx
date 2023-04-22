import React from 'react';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Form, Modal } from 'antd';
import { AddSchemaTypeForm } from '../../form/add-type';
import { Node } from '@antv/x6';
import { PATH } from 'helpers/constants';

export const AddTypeModal: React.FC = () => {
  const { addTypeModal, setAddTypeModal, selectedNode } = useSchema() || {};
  const [form] = Form.useForm();

  const props = {
    centered: true,
    open: addTypeModal !== undefined,
    onCancel: () => {
      setAddTypeModal(undefined);

      const type = selectedNode as Node<Node.Properties>;

      if (!(selectedNode instanceof Node<Node.Properties>)) {
        form.resetFields();
      } else {
        form.setFieldsValue({
          name: type.attr(PATH.NODE_TEXT),
          color: type.attr(PATH.NODE_COLOR),
          parent_id: type.attr('parentId'),
        });
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
