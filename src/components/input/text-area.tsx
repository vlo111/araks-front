import { Input as InputComponent } from "antd"
import { TextAreaProps } from "antd/es/input";
import { useInputSize } from "hooks/use-breakpoint";
import styled from "styled-components";

const { TextArea: TextAreaComponent } = InputComponent;

const TextAreaStyled = styled(TextAreaComponent)`
    background: linear-gradient(91.78deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%);
    border: 1px solid #808080;
    border-radius: 4px;
`;

export const TextArea = (props: TextAreaProps) => {
    const size = useInputSize();
    return <TextAreaStyled size={size} {...props} />
}