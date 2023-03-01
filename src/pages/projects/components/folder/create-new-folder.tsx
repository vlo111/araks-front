import { AddFolderButton } from "components/button"
import { CreateEditFolderModal } from "components/modal/create-edit-folder-modal";
import { useView, ViewTypes } from "context/view-context";
import { useState } from "react";

export const CreateNewFolder = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { state } = useView();

    const showModal = () => {
        setIsModalOpen(true);
    };

    return <>
        <AddFolderButton block onClick={showModal} fullWidth={state === ViewTypes.Grid} />
        <CreateEditFolderModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
}