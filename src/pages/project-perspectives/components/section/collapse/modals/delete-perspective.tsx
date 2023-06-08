import { Modal } from 'components/modal';
import React from 'react';
import { Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { Button } from 'components/button';
import { useDeletePerspective } from 'api/perspective/use-delete-perspective';

type DeletePerspective = React.FC<{ id: string; open: boolean; onCancel: VoidFunction }>;

export const DeletePerspectiveModal: DeletePerspective = ({ id, open, onCancel }) => {
  const { mutate } = useDeletePerspective({
    onSuccess: () => {
      onCancel();
    },
  });

  return (
    <Modal
      title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this perspective?</Text>}
      centered={true}
      footer={false}
      closable={false}
      open={open}
    >
      <VerticalSpace>
        <Button block onClick={() => mutate(id)} type="primary">
          Delete
        </Button>
        <Button block type="default" onClick={onCancel}>
          Cancel
        </Button>
      </VerticalSpace>
    </Modal>
  );
};
