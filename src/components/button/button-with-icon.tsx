import { Button as ComponentButton } from "antd"
import styled from "styled-components"
import { COLORS } from "../../helpers/constants";

export const ButtonWithIcon = styled(ComponentButton)`
    &.ant-btn-default {
        background: ${COLORS.SECONDARY.GRAY_LIGHT};
        border: 1px solid ${COLORS.PRIMARY.WHITE};

        span {
            color: ${COLORS.PRIMARY.GRAY_DARK};
        } 

        &:not(:disabled) {
            &:hover {
                background: #4F5988;

                span {
                    color: ${COLORS.PRIMARY.WHITE};
                }
            }

            &:active {
                background: rgba(71, 80, 123, 0.9);;

                span {
                    color: ${COLORS.PRIMARY.WHITE};
                }
            }
        }

        &:disabled {
            background: #BFBFBF;
            
            span {
                color: ${COLORS.PRIMARY.WHITE};
            }
        }
    }
`;