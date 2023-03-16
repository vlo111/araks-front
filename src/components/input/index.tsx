import { Input as InputComponent, InputProps } from "antd"
import { screenSize } from "helpers/constants";
import { useInputSize } from "hooks/use-breakpoint";
import styled, { css } from "styled-components"

export const Input = styled(InputComponent)`
    background: linear-gradient(91.78deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%);

    ${props => !props.size ? css`
        @media (min-width: ${screenSize.lg}) { 
            height: 30px;
            font-size: 15px;
            line-height: 1.3;
        }

        @media (min-width: ${screenSize.xxl}) { 
            height: 40px;
            font-size: 20px;
            line-height: 1.3;
        }
    ` : ''}

    ::placeholder {
        @media (max-width: ${screenSize.xxl}) { 
            font-size: 15px;
            line-height: 1.3;
        }
    }
`;

export const FormInput = (props: InputProps) => {
    const size = useInputSize();
    return <Input  {...props} />
}

export { TextArea } from './text-area';