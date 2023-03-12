import { Button, ButtonProps } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
    background: linear-gradient(179.75deg, rgba(35, 47, 106, 0.8) 0%, rgba(35, 47, 106, 0.6) 99.91%);
    box-shadow: 0px 4px 4px rgba(47, 57, 107, 0.49);
    backdrop-filter: blur(2px);
    border: none;
    border-radius: 0;
    text-align: start;
    padding: 13px 32px 13px 71px;
    height: 56px;
    display: flex;
    justify-content: space-between;

    &:hover {
        background: linear-gradient(179.75deg, rgba(0, 20, 121, 0.8) 0%, rgba(35, 47, 106, 0.6) 99.91%);
    }
`;

const AddTypeButton = styled(Button)`
    border: none;
    border-radius: 0;
    padding: 0;
    height: 100%;

    span {
        color: #ffffff;
    }
`;

export const AddType = ({ children, ...props }: ButtonProps) => <Wrapper>
    <AddTypeButton type="link" {...props}>+ Add Type</AddTypeButton>
    {children}
</Wrapper>;