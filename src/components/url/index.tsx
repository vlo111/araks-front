import { InputProps } from 'antd';
import { Input } from 'components/input';
import styled from 'styled-components';

export const Url = styled((props: InputProps) => <Input {...props} prefix="http://" type="url" />)``;
