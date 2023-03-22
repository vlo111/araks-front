import { useDeleteFolder } from 'api/folders/use-delete-folder';
import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  folderId: string;
  countItems: number;
};

const deleteText = (count: number) => {
  switch (true) {
    case count === 0:
      return 'There are no Projects for this folder';
    case count === 1:
      return 'There is 1 Project';
    case count > 1:
      return `There are ${count} Projects`;
    default:
      return '';
  }
};

export const DeleteFolderModal = ({ isModalOpen, setIsModalOpen, folderId, countItems }: Props) => {
  const { mutate } = useDeleteFolder(folderId);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteFolder = () => {
    mutate();
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this Folder?</Text>}
        open={isModalOpen}
        footer={false}
        closable={false}
        className="project-modal"
      >
        <VerticalSpace>
          <SecondaryText as="div" style={{ textAlign: 'center' }}>
            {deleteText(countItems)}
          </SecondaryText>
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
