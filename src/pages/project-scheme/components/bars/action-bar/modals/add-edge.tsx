import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'antd';
import {AddSchemaEdgeForm} from "../form/add-edge";

type Props = React.FC<{ open: boolean; cancel: Dispatch<SetStateAction<boolean>> }>;

export const AddEdgeModal: Props = ({ open, cancel }) => {
  const props = {
    centered: true,
    open: open,
    onCancel: () => cancel(false),
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaEdgeForm onCancel={cancel} />
    </Modal>
  );
};
