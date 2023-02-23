import { Button as Component, ButtonProps } from "antd"
import styled, { css } from "styled-components"
import { COLORS } from "../../helpers/constants";
import { ReactComponent as AddFolder } from '../icons/add-folder.svg';

type Props = ButtonProps & {
    fullWidth?: boolean;
};

export const AddFolderButton = styled(({ fullWidth = false, ...props}: Props) => <Component {...props} children='Add Folder' size="large" type="dashed" icon={<AddFolder />} />)`
    &.ant-btn-dashed {
        background: transparent;
        ${(props: Props) => props.fullWidth ? css`
            border: none;
            border-bottom: 1px solid #C3C3C3;
            border-radius: 0;
        ` : css`
            border-color: #C3C3C3;
        `}
        padding: 16px 28px;
        text-align: left;

        span {
            color: ${COLORS.PRIMARY.GRAY};
            margin-left: 8px;
            font-size: 24px;
            line-height: 31px;
            font-weight: 600;
        } 

        &:not(:disabled) {
            &:hover, &:active {
                border-color: #C3C3C3;
            }
        }
    }
`;