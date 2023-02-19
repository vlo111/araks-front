import { Typography } from "antd";
import styled, { css } from "styled-components";

const { Title: TitleComponent } = Typography;

export const Title = styled(TitleComponent)`
    && {
        color: #424242;
        margin: 0px;

        ${props => props.level === 1 ? css`
            font-family: 'Rajdhani';
            font-size: 32px;
            line-height: 41px;
            letter-spacing: 0.07em;
        ` : ''}

        ${props => props.level === 2 ? css`
            font-family: 'Rajdhani';
            font-weight: 700;
            font-size: 30px;
            line-height: 38px;
        ` : ''}
    }
`;

export { MenuText, Text, SecondaryText } from './text';
export { TitleSeparator } from './title-separator';