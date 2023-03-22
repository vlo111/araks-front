import { useState } from 'react';
import { Button as ButtonComponent, Col, Divider, Form, Radio as RadioComponent, Row } from 'antd';
import styled from 'styled-components';
import { CheckOutlined } from '@ant-design/icons';

import { ReactComponent as Camera } from 'components/icons/camera.svg';
import { VerticalSpace } from 'components/space/vertical-space';
import { SecondaryText, Text } from 'components/typography';
import { Modal } from 'components/modal';
import { COLORS } from 'helpers/constants';
import { SelectIcon } from './select-icon';
import { FormItem } from 'components/form/form-item';
import { Icon } from 'components/icon';

const Button = styled(({ color, iconToShow, ...props }) => <ButtonComponent {...props} />)`
  padding: 0;
  width: 160px;
  height: 144px;
  /* height: 100%; */
  border: 1px dashed #808080;
  background: ${(props) => props.color || '#EFEFEF'};
  border-radius: 8px;
`;

type WrapperProp = {
  iconToShow?: string;
};

const Wrapper = styled.div<WrapperProp>`
  margin: ${(props) => (props.iconToShow ? '43px 49px' : '43px 19px')};
`;

const RadioGroup = styled(RadioComponent.Group)``;
const RadioButton = styled(RadioComponent.Button)`
  &&.ant-radio-button-wrapper {
    border: 3px solid #f2f2f2;
    height: 30px;
    width: 30px;
    background-color: ${(props) => props.value};
    padding: 5px;

    &&.ant-radio-button-wrapper-checked {
      border: 3px solid ${(props) => props.value};
      padding: 3px;

      .icon path {
        fill: #ffffff;
      }

      &:hover,
      &:active {
        background: ${(props) => props.value};
      }
    }
  }
`;

const colorsList = Object.values(COLORS.SECONDARY);

export const AddColorIcon = () => {
  const [open, setIsModalOpen] = useState(false);
  const form = Form.useFormInstance();

  const handleCancel = () => {
    form.resetFields(['color', 'icon']);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => setIsModalOpen(true);

  const iconSelected = Form.useWatch('icon');

  return (
    <>
      <Button type="dashed" onClick={handleOpenModal} color={Form.useWatch('color')}>
        <Wrapper iconToShow={iconSelected}>
          {iconSelected ? (
            <Icon color={COLORS.PRIMARY.GRAY} icon={iconSelected} size={62} />
          ) : (
            <>
              <Camera style={{ display: 'flex', margin: '0 45px' }} />
              <SecondaryText as="div" style={{ fontSize: '14px', lineHeight: '20px' }}>
                Add color and icon
              </SecondaryText>
            </>
          )}
        </Wrapper>
      </Button>
      <Modal
        title={false}
        style={{ top: 170, right: '25vw' }}
        open={open}
        footer={false}
        closable={false}
        forceRender
        width={486}
      >
        <VerticalSpace size={32}>
          <VerticalSpace size={20}>
            <Text>Select color</Text>
            <FormItem name="color">
              <RadioGroup buttonStyle="solid">
                <Row gutter={[10, 20]}>
                  {colorsList.map((item) => (
                    <Col key={item} span={2}>
                      <RadioButton value={item}>
                        <CheckOutlined as="div" className="icon" style={{ color: item, fontSize: '20px' }} />
                      </RadioButton>
                    </Col>
                  ))}
                </Row>
              </RadioGroup>
            </FormItem>
            <Divider style={{ color: '#E0E0E0', margin: '0' }} />
            <Text>Select icon</Text>
            <SelectIcon />
            <ButtonComponent block type="primary" onClick={handleSave}>
              SAVE
            </ButtonComponent>
            <ButtonComponent block type="text" onClick={handleCancel}>
              Cancel
            </ButtonComponent>
          </VerticalSpace>
        </VerticalSpace>
      </Modal>
    </>
  );
};
