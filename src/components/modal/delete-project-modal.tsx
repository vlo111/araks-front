import { useDeleteProject } from "api/projects/use-delete-project";
import { Button } from "components/button"
import { Modal } from "components/modal";
import VerticalSpace from "components/space/vertical-space";
import { Text } from "components/typography";

type Props = {
    isModalOpen: boolean;
    isPublic?: boolean;
    folderId?: string;
    setIsModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    projectId: string;
};

export const DeleteProjectModal = ({ isModalOpen, setIsModalOpen, folderId, projectId, isPublic }: Props) => {

    const { mutate } = useDeleteProject({projectId, folderId});

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteFolder = () => {
        mutate();
        setIsModalOpen(false);
    }

    return <>
        <Modal 
            title={<Text style={{ textAlign: 'center' }}>Are you sure you wish to permanently remove this project?</Text>} 
            open={isModalOpen} 
            footer={false} 
            closable={false}
            className='project-modal'
        >
            <VerticalSpace>
                <Button block onClick={deleteFolder} type="primary">Delete</Button>
                <Button block type="default" onClick={handleCancel}>Cancel</Button>
            </VerticalSpace>
        </Modal>
    </>
}