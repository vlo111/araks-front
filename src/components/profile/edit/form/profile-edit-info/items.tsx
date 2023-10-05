import { Col, Divider, Form, Row } from 'antd';
import { FormItem } from 'components/form/form-item';
import { FormInput, TextArea } from 'components/input';
import { rulesInput } from '../../utils';
import { Button } from 'components/button';
import { FC } from 'react';

type Props = FC<{
  userInfo: {
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
    bio: string | undefined;
  };
}>;

export const EditProfileItems: Props = ({ userInfo }) => {
  const userForm = {
    first_name: Form.useWatch('first_name', { preserve: true }),
    last_name: Form.useWatch('last_name', { preserve: true }),
    email: Form.useWatch('email', { preserve: true }),
    bio: Form.useWatch('bio', { preserve: true }),
  };

  const isUpdated = JSON.stringify(userInfo) === JSON.stringify(userForm);

  return (
    <>
      <Row>
        <Col span={11}>
          <FormItem name="first_name" label="First Name" rules={rulesInput}>
            <FormInput placeholder="First Name" />
          </FormItem>
        </Col>
        <Col span={12} offset={1}>
          <FormItem name="last_name" label="Last Name" rules={rulesInput}>
            <FormInput placeholder="Last Name" />
          </FormItem>
        </Col>
        <Divider style={{ color: 'red', marginTop: '6px' }} />
      </Row>
      <FormItem name="bio" label="Description">
        <TextArea rows={4} maxLength={250} />
      </FormItem>
      <Button block type="primary" htmlType="submit" disabled={isUpdated}>
        Save
      </Button>
    </>
  );
};
