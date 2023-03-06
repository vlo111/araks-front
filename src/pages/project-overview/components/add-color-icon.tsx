import { Button as ButtonComponent, Col, Radio as RadioComponent, Row } from "antd";
import styled from "styled-components";
import { CheckOutlined } from '@ant-design/icons';


import { ReactComponent as Camera } from 'components/icons/camera.svg';
import VerticalSpace from "components/space/vertical-space";
import { SecondaryText, Text } from "components/typography";
import { Modal } from "components/modal";
import { COLORS } from "helpers/constants";

const Button = styled(ButtonComponent)`
    padding: 43px 19px;
    height: 100%;
    border: 1px dashed #808080;
    background: #EFEFEF;
    border-radius: 8px;
`;

const RadioGroup = styled(RadioComponent.Group)`
   
`;
const RadioButton = styled(RadioComponent.Button)`
    height: 30px;
    width: 30px;
    border: none;
    background-color: ${props => props.value};
    padding: 5px;

    &&.ant-radio-button-wrapper-checked {
        .icon path {
            fill: #ffffff;
        }

        &:hover, &:active {
            background: ${props => props.value};
        }
    }
`;

const colorsList = Object.values(COLORS.SECONDARY);

export const AddColorIcon = () => {
    return <><Button type="dashed">
        <VerticalSpace size={8}>
            <Camera style={{ display: 'flex', margin: '0 45px' }} />
            <SecondaryText as='div' style={{ fontSize: '14px', lineHeight: '20px' }}>Add color and icon</SecondaryText>
        </VerticalSpace>
    </Button>
    <Modal 
        title={false} 
        open={true} 
        footer={false} 
        closable={false}
        // afterClose={afterClose}
        forceRender
    >
        <VerticalSpace size={32}>
            <VerticalSpace size={20}>
                <Text>Select color</Text>
                <RadioGroup buttonStyle="solid">
                    <Row gutter={[10, 20]}>
                        {colorsList.map(item => <Col key={item}>
                            <RadioButton value={item}><CheckOutlined as='div' className="icon" style={{ color: item, fontSize: '20px' }} /></RadioButton>
                        </Col>)}
                    </Row>
                </RadioGroup>
            </VerticalSpace>

        </VerticalSpace>
    </Modal>
    </>
}