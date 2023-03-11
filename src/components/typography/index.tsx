import { Typography } from "antd";
import styled, { css } from "styled-components";

const { Title: TitleComponent } = Typography;

export const Title = styled(({color, ...props}) => <TitleComponent {...props} />)`
    && {
        color: ${props => props.color || '#424242'};
        margin: 0px;

        ${props => props.level === 1 ? css`
            letter-spacing: 0.07em;
        ` : ''}

        ${props => props.level === 2 ? css`
            font-weight: 700;
        ` : ''}

        ${props => props.level === 3 ? css`
            font-weight: 600;
        ` : ''}
    }
`;

export { MenuText, Text, SecondaryText, textStyles } from './text';
export { TitleSeparator } from './title-separator';
export { LongTitle } from './long-title';