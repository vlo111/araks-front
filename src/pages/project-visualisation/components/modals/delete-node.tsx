import { useDeleteNode } from 'api/node/use-delete-node';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Button } from 'components/button';

export const NodeDelete = () => {
  const { graph, nodes, setNodes, deleteNode, finishDeleteNode, finishOpenNode } = useGraph() ?? {};

  const { mutate } = useDeleteNode(deleteNode?.id, {
    onSuccess: () => {
      graph.removeItem(deleteNode.id);
      finishDeleteNode();
      finishOpenNode();
      setNodes(nodes.filter((n) => n.id !== deleteNode.id));
    },
  });

  const deleteNodeHandle = async () => {
    await mutate();
  };

  return (
    <>
      <Modal
        title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this node?</Text>}
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
