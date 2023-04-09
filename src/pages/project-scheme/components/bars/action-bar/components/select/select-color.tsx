import styled from 'styled-components';
import { ButtonProps, Form } from 'antd';
import { Button } from 'components/button';
import { forwardRef } from 'react';
import { SelectColorPopover } from 'components/popover';
import { SketchPicker } from 'react-color';
import { COLORS } from 'helpers/constants';

type ButtonStyleProps = ButtonProps & {
  color?: string;
};

const ButtonColor = styled(
  forwardRef<HTMLButtonElement, ButtonStyleProps>(({ color, ...props }, ref) => <Button {...props} ref={ref} />)
)`
  background-color: ${(props) => props.color ?? '#C3C3C3'};
  padding: 7px 16px;
  text-align: start;

  span {
    color: ${COLORS.PRIMARY.GRAY_DARK};
  }

  &&:hover {
    background-color: ${(props) => props.color ?? '#C3C3C3'};
  }
`;

export const SelectColor = () => {
  const form = Form.useFormInstance();

  const color = Form.useWatch('color', form);

  return (
    <SelectColorPopover
      content={<SketchPicker color={color} onChange={(color) => form.setFieldValue('color', color.hex)} />}
      overlayStyle={{ width: 220 }}
    >
      <ButtonColor block type="primary" color={color}>
        Select color
      </ButtonColor>
    </SelectColorPopover>
  );
};
