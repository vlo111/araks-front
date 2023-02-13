import { Button as Component, ButtonProps } from "antd"
import styled from "styled-components"

import { COLORS } from "../../helpers/constants";
import { ReactComponent as AzureSignUp } from '../icons/azure-sign-up.svg';

const getTypeData = (type: string) => {
    switch (type) {
        case 'azure':
            return ({
                icon: <AzureSignUp />,
                children: 'Sign Up With Microsoft Azure'
            })
    }
}

type Props = ButtonProps & {
    iconType: 'azure',
}

export const SignUpButton = styled(({iconType, ...props} : Props) => <Component {...props} {...getTypeData(iconType)} />)`
    &.ant-btn-default {
        background: #F5F5F5;
        border-color: ${COLORS.PRIMARY.WHITE};

        span {
            color: ${COLORS.PRIMARY.GRAY_DARK};
            margin-left: 16px;
        } 
        
        &:hover {
            background: #EDEDED;
            border-color: ${COLORS.PRIMARY.WHITE};
        }

        &:active {
            background: #F5F5F5;
            border-color: ${COLORS.PRIMARY.WHITE};
        }

        &:disabled {
            background: #F5F5F5;
            opacity: 0.6;
        }
    }
`;