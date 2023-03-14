import { Col, Radio as RadioComponent, Row } from "antd"
import styled from "styled-components"
import { COLORS } from "helpers/constants";
import { Gutter } from "antd/es/grid/row";

const RadioGroup = styled(RadioComponent.Group)`
   
`;
const RadioButton = styled(RadioComponent.Button)`
    &&.ant-radio-button-wrapper {
        border: 3px solid #F2F2F2;
        height: 30px;
        width: 30px;
        background-color: ${props => props.value};
        padding: 5px;

        &&.ant-radio-button-wrapper-checked {
            border: 3px solid ${props => props.value};
            padding: 3px;

            &:hover, &:active {
                background: ${props => props.value};
            }
        }
    }
`;

const colorsList = Object.values(COLORS.SECONDARY);

type Props = {
    gutter?: Gutter | [Gutter, Gutter],
    setValue?: (color: string) => void
};

export const ColorList = ({ gutter = [10, 20], setValue }: Props) => {
    return <RadioGroup buttonStyle="solid" onChange={(e)=> setValue?.(e.target?.value)}>
    <Row gutter={gutter}>
        {colorsList.map(item => <Col key={item} span={2}>
            <RadioButton value={item}></RadioButton>
        </Col>)}
    </Row>
</RadioGroup>
}