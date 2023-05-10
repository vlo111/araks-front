import { InputProps } from 'antd';
import styled from 'styled-components';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Input } from 'components/input';

const prefix = <EnvironmentOutlined />;

export const Location = styled((props: InputProps) => <Input {...props} prefix={prefix} placeholder="Location" />)``;
