import { useDeleteNode } from 'api/node/use-delete-node';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Button } from 'components/button';
import { useDeleteAllDataChecked } from 'api/all-data/use-delete-all-data-checked';
import { Spinning } from 'components/spinning';

export const NodeDeleteModal = () => {
  const { graph, deleteNode, finishDeleteNode, finishOpenNode, graphInfo, setGraphInfo } = useGraph() ?? {};

  const { mutate: multipleDelete, isLoading: isLoadingNodes } = useDeleteAllDataChecked(deleteNode?.ids ?? [], {
    enabled: !!deleteNode?.ids,
    onSuccess: () => {
      deleteNode?.ids?.forEach((n) => {
        graph.removeItem(n);
      });

      const deleteNodeLength = deleteNode?.ids?.length ?? 0;

      setGraphInfo({
        nodeCount: (graphInfo?.nodeCount ?? 0) - deleteNodeLength,
        nodeCountAPI: (graphInfo?.nodeCountAPI ?? 0) - deleteNodeLength,
      });

      const selectCombo = graph.findById('combo-select');
      if (selectCombo) graph.uncombo(selectCombo.getID());

      graph.addBehaviors(['drag-node', 'create-edge'], 'default');
    },
  });

  const { mutate, isLoading: isLoadingNode } = useDeleteNode(deleteNode?.id ?? '', {
    onSuccess: () => {
      graph.removeItem(deleteNode?.id ?? '');

      setGraphInfo({
        nodeCount: (graphInfo?.nodeCount ?? 0) - 1,
        nodeCountAPI: (graphInfo?.nodeCountAPI ?? 0) - 1,
      });
      finishOpenNode();
    },
  });

  const deleteNodeHandle = () => {
    finishDeleteNode();
    if (deleteNode.id) mutate();
    else multipleDelete();
  };

  return (
    <>
      {(isLoadingNode || isLoadingNodes) && <Spinning />}
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
