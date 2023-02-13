import { Checkbox as CheckboxComponent, CheckboxProps, Input as InputComponent, InputProps } from "antd"
import styled from "styled-components"
import VerticalSpace from "../space/vertical-space";

type Props = {
    inputProps?: InputProps,
    checkboxProps?: CheckboxProps
}

export const Checkbox = styled((props: CheckboxProps) =><CheckboxComponent {...props} children='Convert as node picture' />)``;


const Input = styled((props: InputProps) => <InputComponent {...props} prefix="http://" type='url' />)``;

export const ImageUrl = styled(({inputProps, checkboxProps}: Props ) => <VerticalSpace size='small'>
    <Input {...inputProps} />
    <Checkbox {...checkboxProps} />
</VerticalSpace>)``;
