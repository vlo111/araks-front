import { Modal as ModalComponent } from 'antd';
import styled from "styled-components";

export const Modal = styled(ModalComponent)`
    .ant-modal-content {
        background: #F2F2F2;
        box-shadow: 0px 20px 20px rgba(111, 111, 111, 0.3);

        .ant-modal-header {
            background-color: transparent;
            margin-bottom: 34px;

            .ant-modal-title {
                text-align: center;
            }
        }
    }

    &.project-modal {
        .ant-modal-content {
            padding-top: 60px;
            padding-bottom: 60px;
        }
    }
    
`;

export { CreateEditFolderModal } from './create-edit-folder-modal';
export { DeleteFolderModal } from './delete-folder-modal';