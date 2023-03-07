import { Typography, TypographyProps } from "antd";
import styled, { css } from "styled-components";
import { COLORS } from "../../helpers/constants";

const { Text: TextComponent } = Typography;

export const Text = styled(({ color, ...props }) => <TextComponent {...props} />)`
    && {
        font-family: 'Rajdhani';
        font-weight: 600;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: 0.07em;
        color: ${props=> props.color || COLORS.PRIMARY.GRAY_DARK};
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

export const SecondaryText = styled(({ color, ...props }) => <Text {...props} />)`
    && {
        font-size: 16px;
        line-height: 20px;
        color: ${props=> props.color || '#424242'};
    }
`;
