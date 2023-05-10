import { Col, Divider, Form, Row } from 'antd';
import { FormItem } from 'components/form/form-item';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { ProfilePassword } from 'types/auth';
import { Title } from '../../../typography';
import styled from 'styled-components';
import { rulesPassword } from '../utils';
import { useUpdatePassword } from 'api/profile/use-update-password';

const ColItemInput = styled(Col)`
  .ant-form-item-explain-error {
    font-weight: 600;
    font-size: 16px;
  }

  .ant-input-password {
    height: 40px;
  }
`;

export const EditPassword = () => {
  const [form] = Form.useForm();

  const { mutate: updatePassword } = useUpdatePassword();

  const onFinish = (values: ProfilePassword) => {
    updatePassword({
      ...values,
    });
  };

  return (
    <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
      <Row gutter={[10, 24]}>
        <Col span={24}>
          <Title>Change Password</Title>
        </Col>
        <Col span={24}>
          <Row>
            <ColItemInput span={12}>
              <FormItem name="old_password" label="Old Password" rules={rulesPassword}>
                <Input.Password />
              </FormItem>
            </ColItemInput>
            <Divider style={{ color: 'red', marginTop: '6px' }} />
            <ColItemInput span={12}>
              <FormItem name="new_password" label="New password" rules={rulesPassword}>
                <Input.Password />
              </FormItem>
            </ColItemInput>
            <ColItemInput span={11} offset={1}>
              <FormItem name="confirm_password" label="Repeat password" rules={rulesPassword}>
                <Input.Password />
              </FormItem>
            </ColItemInput>
          </Row>
        </Col>
        <Col span={24}>
          <Button block type="primary" htmlType="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
