import { useDeleteProjectEdgeTypeProperty } from 'api/node-edge-type/use-delete-project-edge-type-property';
import { Button } from 'components/button';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';

type Props = {
  id: string;
};

export const DeleteConnectionTypePropertyModal = ({ id }: Props) => {
  const { nodeTypeId } = useDataSheetWrapper();
  const {
    state: { deleteConnectionTypeisOpened },
    dispatch,
  } = useTypeProperty();
  const { mutate } = useDeleteProjectEdgeTypeProperty(id, nodeTypeId || '');

  const handleCancel = () => {
    dispatch({ type: TypePropertyActionKind.DELETE_CONNECTION_TYPE_FINISH, payload: {} });
  };

  const deleteFolder = () => {
    mutate();
    dispatch({ type: TypePropertyActionKind.DELETE_CONNECTION_TYPE_FINISH, payload: {} });
  };

  return (
    <>
      <Modal
        title={
          <Text style={{ textAlign: 'center' }}>
            Are you sure you wish to permanently remove this connection type property?
          </Text>
        }
        open={deleteConnectionTypeisOpened}
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
    </>
  );
};
