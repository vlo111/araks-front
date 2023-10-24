import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Button } from 'components/button';
import { useDeleteEdge } from 'api/edges/use-delete-edge';
import { updateConnector } from 'components/layouts/components/visualisation/helpers/utils';

export const EdgeDeleteModal = () => {
  const { graph, deleteEdge, finishDeleteEdge, finishOpenEdge } = useGraph() ?? {};

  const { mutateAsync } = useDeleteEdge(deleteEdge?.id ?? '', {
    onSuccess: () => {
      graph.removeItem(deleteEdge?.id ?? '');
      finishDeleteEdge();
      finishOpenEdge();

      updateConnector(graph);
    },
  });

  const deleteNodeHandle = async () => {
    await mutateAsync();
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
