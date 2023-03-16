import { Button, PopoverProps } from "antd";
import { AddTypeForm } from "components/form/add-type-form";
import { AddNodeTypePopover } from "components/popover";
import { Title } from "components/typography";
import styled, { css } from "styled-components";

type WrapperProps = {
    showButton: boolean;
};

const Wrapper = styled.div<WrapperProps>`
    ${props => props.showButton 
        ? css` 
            background: linear-gradient(179.75deg, rgba(35, 47, 106, 0.8) 0%, rgba(35, 47, 106, 0.6) 99.91%);
            box-shadow: 0px 4px 4px rgba(47, 57, 107, 0.49);
        ` 
        : css` 
            background: transparent;
            box-shadow: none;
        `}
    
    backdrop-filter: blur(2px);
    border: none;
    border-radius: 0;
    text-align: start;
    padding: 13px 32px 13px 71px;
    height: 56px;
    display: flex;
    justify-content: space-between;

    &:hover {
        ${props => props.showButton 
        ? css` background: linear-gradient(179.75deg, rgba(35, 47, 106, 0.8) 0%, rgba(35, 47, 106, 0.6) 99.91%);` 
        : css` background: transparent;`}
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

type Props = PopoverProps & {
    showButton: boolean;
    titleText?: string;
    onClick: () => void
};

export const AddType = ({ children, showButton, titleText, onClick, ...props }: Props) => <Wrapper showButton={showButton}>
    <AddNodeTypePopover content={<AddTypeForm />} trigger="click" {...props}>
        {showButton && <AddTypeButton type="link" onClick={onClick}>+ Add Type</AddTypeButton>}
        {titleText &&  <Title level={3}>{titleText}</Title> }
    </AddNodeTypePopover>
    {children}
</Wrapper>;