import { Typography } from "antd";
import styled, { css } from "styled-components";

const { Title: TitleComponent } = Typography;

export const Title = styled(({color, ...props}) => <TitleComponent {...props} />)`
    && {
        color: ${props => props.color || '#424242'};
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

        ${props => props.level === 3 ? css`
            font-family: 'Rajdhani';
            font-weight: 600;
            font-size: 24px;
            line-height: 31px;
        ` : ''}
    }
`;

export { MenuText, Text, SecondaryText, textStyles } from './text';
export { TitleSeparator } from './title-separator';
export { LongTitle } from './long-title';