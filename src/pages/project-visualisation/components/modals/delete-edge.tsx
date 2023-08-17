import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Button } from 'components/button';
import { useDeleteEdge } from 'api/edges/use-delete-edge';

export const EdgeDelete = () => {
  const { graph, deleteEdge, finishDeleteEdge } = useGraph() ?? {};

  const { mutate } = useDeleteEdge(deleteEdge?.id, {
    onSuccess: () => {
      graph.removeItem(deleteEdge.id);
      finishDeleteEdge();
    },
  });

  const deleteNodeHandle = async () => {
    await mutate();
  };

  return (
    <>
      <Modal
        title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this edge?</Text>}
        open={deleteEdge?.isOpened}
        footer={false}
        closable={false}
        className="project-modal"
      >
        <VerticalSpace>
          <Button block onClick={deleteNodeHandle} type="primary">
            Delete
          </Button>
          <Button
            block
            type="default"
            onClick={() => {
              finishDeleteEdge();
            }}
          >
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
    </>
  );
};
