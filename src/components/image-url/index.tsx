import { Checkbox as CheckboxComponent, CheckboxProps, Input as InputComponent, InputProps } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import styled from 'styled-components';

type Props = {
  inputProps?: InputProps;
  checkboxProps?: CheckboxProps;
};

export const Checkbox = styled((props: CheckboxProps) => (
  <CheckboxComponent {...props}>Convert as node picture</CheckboxComponent>
))``;

const Input = styled((props: InputProps) => <InputComponent {...props} prefix="http://" type="url" />)``;

export const ImageUrl = styled(({ inputProps, checkboxProps }: Props) => (
  <VerticalSpace size="small">
    <Input {...inputProps} />
    <Checkbox {...checkboxProps} />
  </VerticalSpace>
))``;
