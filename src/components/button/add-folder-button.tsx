import { Button as Component } from "antd"
import styled from "styled-components"
import { COLORS } from "../../helpers/constants";
import { ReactComponent as AddFolder } from '../icons/add-folder.svg';

export const AddFolderButton = styled((props) => <Component {...props} children='Add Folder' size="large" type="dashed" icon={<AddFolder />} />)`
    &.ant-btn-dashed {
        background: transparent;
        border-color: #C3C3C3;
        padding: 16px 28px;
        text-align: left;

        span {
            color: ${COLORS.PRIMARY.GRAY};
            margin-left: 8px;
        } 

        &:not(:disabled) {
            &:hover, &:active {
                border-color: #C3C3C3;
            }
        }
    }
`;