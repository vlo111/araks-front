import { Button as Component } from "antd"
import styled from "styled-components"

import { COLORS } from "../../helpers/constants";
import VerticalSpace from "../space/vertical-space";
import { ReactComponent as PlusDashed } from '../icons/plus-dashed.svg';

const ButtonContent = () => <VerticalSpace size="small">
<PlusDashed style={{ fontSize: '60px' }} />
<div className="button-content__text">Create New <br /> Project</div>
</VerticalSpace>;

export const CreateNewProjectButton = styled((props) => <Component {...props} children={<ButtonContent />} />)`
    &.ant-btn-default {
        background: transparent;
        border-color: transparent;
        height: 100%;
        padding: 20px 20px 10px;

        .button-content__text {
            color: ${COLORS.PRIMARY.GRAY_DARK};
        } 
        
        &:hover, &:active {
            border-color: transparent;
            background-color: rgba(35, 47, 106, 0.1);
        }
    }
`;