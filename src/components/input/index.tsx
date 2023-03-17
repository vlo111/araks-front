import { Input as InputComponent, InputProps } from "antd"
import { changeHeight, placeholderSize } from "helpers/styles";
import { useInputSize } from "hooks/use-breakpoint";
import styled, { css } from "styled-components";

export const Input = styled(InputComponent)`
    background: linear-gradient(91.78deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%);

    ${props => !props.size ? css`
        ${changeHeight}
    ` : ''}

    ::placeholder {
        ${placeholderSize}
    }
`;

export const FormInput = (props: InputProps) => {
    const size = useInputSize();
    return <Input  {...props} />
}

export { TextArea } from './text-area';