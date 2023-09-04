import { useDeleteNode } from 'api/node/use-delete-node';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Button } from 'components/button';
import { useDeleteAllDataChecked } from '../../../../api/all-data/use-delete-all-data-checked';

export const NodeDeleteModal = () => {
  const { graph, deleteNode, finishDeleteNode, finishOpenNode } = useGraph() ?? {};

  const { mutate: multipleDelete } = useDeleteAllDataChecked(deleteNode?.ids ?? [], {
    enabled: !!deleteNode?.ids,
    onSuccess: () => {
      deleteNode?.ids?.forEach((n) => {
        graph.removeItem(n);
      });
      finishDeleteNode();
      graph.uncombo(graph.getCombos()[0]._cfg?.id as string);
      graph.addBehaviors('drag-node', 'default');
    },
  });

  const { mutate } = useDeleteNode(deleteNode?.id ?? '', {
    onSuccess: () => {
      graph.removeItem(deleteNode?.id ?? '');
      finishDeleteNode();
      finishOpenNode();
    },
  });

  const deleteNodeHandle = () => {
    if (deleteNode.id) mutate();
    else multipleDelete();
  };

  return (
    <>
      <Modal
        title={
          <Text style={{ textAlign: 'center' }}>{`Are you sure you wish to permanently remove this node(s) ?`}</Text>
        }
        open={deleteNode?.isOpened}
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
              finishDeleteNode();
            }}
          >
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
    </>
  );
};
