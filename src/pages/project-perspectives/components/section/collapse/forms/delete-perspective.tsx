import { Modal } from 'components/modal';
import { AddSchemaEdgeForm } from '../../../../../project-scheme/components/action-bar/form/add-edge';

export const DeletePerspectiveModal = ({ open, onCancel }: { open: boolean; onCancel: VoidFunction }) => {
  const props = {
    centered: true,
    open: open,
    onCancel,
    footer: false,
  };

  return (
    <Modal {...props}>
      <AddSchemaEdgeForm />
    </Modal>
  );
};
