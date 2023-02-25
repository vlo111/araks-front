import { Typography } from "antd";
import styled, { css } from "styled-components";
import { COLORS } from "../../helpers/constants";

const { Text: TextComponent } = Typography;

export const Text = styled(TextComponent)`
    && {
        font-family: 'Rajdhani';
        font-weight: 600;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: 0.07em;
        color: ${COLORS.PRIMARY.GRAY_DARK};
    }
`;

export const MenuText = styled(Text)`
    && {
        font-weight: 500;

        ${props => props.strong ? css`
            &.ant-typography strong {
                font-weight: 700;
            }
        ` : ''}
    }
`;

export const SecondaryText = styled(Text)`
    && {
        font-size: 16px;
        line-height: 20px;
        color: #424242;
    }
`;
