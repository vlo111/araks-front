import { Modal } from 'components/modal';
import { AddForm } from '../forms/edit-perspective';
import React from 'react';

type EditPerspective = React.FC<{ open: boolean; onCancel: VoidFunction, id?: string }>;

export const EditPerspectiveModal: EditPerspective = ({ id, ...props }) => (
  <Modal centered={true} footer={false} {...props}>
    <AddForm id={id} onCancel={props.onCancel} />
  </Modal>
);
