import { useDeleteAllDataChecked } from 'api/all-data/use-delete-all-data-checked';
import { DeleteAction } from 'components/actions/delete';
import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { useState } from 'react';

type Props = {
  checkedItems: string[];
  setCheckedItems: (checkedItems: string[]) => void;
  onSubmit: VoidFunction;
};

export const DeleteAllDataModal = ({ checkedItems, setCheckedItems, onSubmit }: Props) => {
  const [isDeleteStart, setDeleteStart] = useState(false);
  const { mutate } = useDeleteAllDataChecked(checkedItems);

  const handleDelete = async () => {
    await mutate();
    setDeleteStart(false);
    setCheckedItems([]);
    onSubmit();
  };

  return (
    <>
      <Modal
        title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this data?</Text>}
        open={isDeleteStart}
        footer={false}
        closable={false}
        className="project-modal"
      >
        <VerticalSpace>
          <Button block onClick={handleDelete} type="primary">
            Delete
          </Button>
          <Button
            block
            type="default"
            onClick={() => {
              setDeleteStart(false);
            }}
          >
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
      {!!checkedItems.length && <DeleteAction onClick={() => setDeleteStart(true)} disabled={isDeleteStart} />}
    </>
  );
};
