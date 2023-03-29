import { Button, ButtonProps, Form } from 'antd';
import styled from 'styled-components';
import { COLORS } from 'helpers/constants';
import { SelectColorPopover } from 'components/popover';
// import { ColorList } from "components/color-list";
import { forwardRef, useCallback, useState } from 'react';
import { SketchPicker } from 'react-color';

type ButtonStyleProps = ButtonProps & {
  color?: string;
};

const ButtonColor = styled(
  forwardRef<HTMLButtonElement, ButtonStyleProps>(({ color, ...props }, ref) => <Button {...props} ref={ref} />)
)`
  background-color: ${(props) => props.color};
  padding: 7px 16px;
  text-align: start;

  span {
    color: ${COLORS.PRIMARY.GRAY_DARK};
  }

  &&:hover {
    background-color: ${(props) => props.color};
  }
`;

type Props = {
  initialColor?: string;
};

const state = {
  hue: 50,
};

export const ColorSelect = ({ initialColor }: Props) => {
  const [color, setColor] = useState(initialColor || '#DDDDDD');
  const form = Form.useFormInstance();
  const setValue = useCallback(
    (color: string) => {
      form.setFieldValue('color', color);
      setColor(color);
    },
    [form]
  );
  return (
    <SelectColorPopover
      content={<SketchPicker color={color} onChange={(color) => setValue(color.hex)} {...state} />}
      overlayStyle={{ width: 220 }}
    >
      <ButtonColor block type="primary" color={color}>
        Select color
      </ButtonColor>
    </SelectColorPopover>
  );
};
