import { useDeleteProjectEdgeType } from 'api/node-edge-type/use-delete-project-edge-type';
import { Button } from 'components/button';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useState } from 'react';

type Props = {
  id: string;
  hide?: () => void;
};

export const DeleteConnectionTypeModal = ({ id, hide }: Props) => {
  const { nodeTypeId, deleteEditType } = useDataSheetWrapper();

  const [isDeleteStart, setDeleteStart] = useState(false);

  const { mutate } = useDeleteProjectEdgeType(id, nodeTypeId || '');

  const handleCancel = () => {
    setDeleteStart(false);
  };

  const deleteFolder = () => {
    mutate();
    setDeleteStart(false);
    hide?.();
    // call this just to close everything and go to default node type
    deleteEditType();
  };

  return (
    <>
      <Modal
        title={
          <Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this type property?</Text>
        }
        open={isDeleteStart}
        footer={false}
        closable={false}
        className="project-modal"
      >
        <VerticalSpace>
          <Button block onClick={deleteFolder} type="primary">
            Delete
          </Button>
          <Button block type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
      <Button block type="text" onClick={() => setDeleteStart(true)}>
        Delete
      </Button>
    </>
  );
};
