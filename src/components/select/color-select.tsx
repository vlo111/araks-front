import { Button, Col, Form, Radio as RadioComponent, Row } from "antd"
import { useBreakpoint } from "hooks/use-breakpoint";
import styled from "styled-components"
import { COLORS } from "helpers/constants";
import { SelectColorPopover } from "components/popover";
import { ColorList } from "components/color-list";
import { useCallback, useState } from "react";

const ButtonColor = styled(({ color, ...props }) => <Button {...props} />)`
    background-color: ${props => props.color};
    padding: 7px 16px;
    text-align: start;

    span {
        color: ${COLORS.PRIMARY.GRAY_DARK}
    }

    &&:hover {
        background-color: ${props => props.color};;
    }
`;

export const ColorSelect = () => {
    const [color, setColor] = useState('#DDDDDD');
    const form = Form.useFormInstance();
    const setValue = useCallback((color: string) => {
        form.setFieldValue('color', color);
        setColor(color);
    }, [form]);
    return <SelectColorPopover content={<ColorList gutter={[10, 0]} setValue={setValue} />} overlayStyle={{ width: 400 }}>
        <ButtonColor block type="primary" color={color}>Select color</ButtonColor>
    </SelectColorPopover>
}