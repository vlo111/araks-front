import { COLORS } from "helpers/constants";
import styled from "styled-components";

type ContentType = {
    color?: string;
};

export const ColorFill = styled.div<ContentType>`
    height: 8px;
    background-color: ${props => props.color || COLORS.PRIMARY.BLUE};
`;
