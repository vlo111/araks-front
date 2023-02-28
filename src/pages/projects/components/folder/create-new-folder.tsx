import { AddFolderButton } from "components/button"
import { useView, ViewTypes } from "context/view-context";
import { useState } from "react";
import { FolderModal } from "./folder-modal";

export const CreateNewFolder = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { state } = useView();

    const showModal = () => {
        setIsModalOpen(true);
    };

    return <>
        <AddFolderButton block onClick={showModal} fullWidth={state === ViewTypes.Grid} />
        <FolderModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
}