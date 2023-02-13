import { Input as InputComponent, InputProps } from "antd"
import styled from "styled-components"
import { EnvironmentOutlined } from '@ant-design/icons';

const prefix = <EnvironmentOutlined />;

export const Location = styled((props: InputProps) => <InputComponent {...props} prefix={prefix} placeholder='Location here' />)``;
