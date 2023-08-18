import { PROJECT_DELETE_URL, SHARED_PROJECT_DELETE_URL, useDeleteProject } from 'api/projects/use-delete-project';
import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { PATHS } from 'helpers/constants';
import { useLocation } from 'react-router-dom';

type Props = {
  isModalOpen: boolean;
  isPublic?: boolean;
  folderId?: string;
  closePreview?: () => void;
  setIsModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  projectId: string;
};

export const DeleteProjectModal = ({
  isModalOpen,
  setIsModalOpen,
  folderId,
  projectId,
  isPublic,
  closePreview,
}: Props) => {
  const location = useLocation();
  const { mutate } = useDeleteProject({
    projectId,
    folderId,
    url: location.pathname === PATHS.SHARED ? SHARED_PROJECT_DELETE_URL : PROJECT_DELETE_URL,
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteFolder = () => {
    mutate();
    setIsModalOpen(false);
    if (closePreview) closePreview();
  };

  return (
    <>
      <Modal
        title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this project?</Text>}
        open={isModalOpen}
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
