import { useDeleteEdge } from 'api/edges/use-delete-edge';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useState } from 'react';

type Props = {
  id: string;
  onClose: () => void;
};

export const DeleteEdgeModal = ({ id, onClose }: Props) => {
  const [isDeleteStart, setDeleteStart] = useState(false);
  const { mutate } = useDeleteEdge(id);

  const deleteFolder = async () => {
    await mutate();
    setDeleteStart(false);
    onClose();
  };

  return (
    <>
      <Modal
        title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this edge data?</Text>}
        open={isDeleteStart}
        footer={false}
        closable={false}
        className="project-modal"
      >
        <VerticalSpace>
          <Button block onClick={deleteFolder} type="primary">
            Delete
          </Button>
          <Button
            block
            type="default"
            onClick={() => {
              setDeleteStart(false);
              onClose();
            }}
          >
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
      <Button
        type="link"
        disabled={isDeleteStart}
        icon={<Icon color="#414141" icon="delete_outline-simple" size={24} />}
        onClick={() => setDeleteStart(true)}
      />
    </>
  );
};
