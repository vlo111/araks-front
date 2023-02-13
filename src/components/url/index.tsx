import { Input as InputComponent, InputProps } from "antd"
import styled from "styled-components"

export const Url = styled((props: InputProps) => <InputComponent {...props} prefix="http://" type='url' />)``;
