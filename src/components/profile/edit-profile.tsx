import { Col, Divider, Form, Row } from 'antd';
import styled from 'styled-components';
import { useAuth } from '../../context/auth-context';
import { FormItem } from '../form/form-item';
import { FormInput, TextArea } from '../input';
import { useEffect } from 'react';
import { Button } from '../button';
import { useUpdateProfile } from '../../api/profile/use-update-profile';
import { ProfileForm } from '../../types/auth';

const Wrapper = styled(Col)`
  background: #f7f7f7;
  box-shadow: inset -10px 10px 10px rgba(111, 111, 111, 0.1);
  padding: 2rem 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .ant-form {
    width: 100%;
    padding: 0 2rem;

    button {
      max-width: 450px;
      min-width: 100px;
      margin: 0 auto;
      display: block;
    }

    textarea {
      max-height: 200px;
    }
  }
`;

export const EditProfile = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();

  const { mutate: updateProfile } = useUpdateProfile();

  useEffect(() => {
    form.setFieldsValue({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      bio: user?.bio,
    });
  });

  const onFinish = (values: ProfileForm) => {
    updateProfile({
      ...values,
    });
  };

  return (
    <Wrapper span={15} xs={24} sm={24} md={15}>
      <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
        <Row>
          <Col span={11}>
            <FormItem
              name="first_name"
              label="First Name"
              rules={[
                { required: true, message: 'First name is required' },
                { min: 3, message: 'The minimum length for this field is 3 characters' },
                { max: 30, message: 'The maximum length for this field is 30 characters' },
              ]}
            >
              <FormInput placeholder="First Name" />
            </FormItem>
          </Col>
          <Col span={12} offset={1}>
            <FormItem
              name="last_name"
              label="Last Name"
              rules={[
                { required: true, message: 'Last name is required' },
                { min: 3, message: 'The minimum length for this field is 3 characters' },
                { max: 30, message: 'The maximum length for this field is 30 characters' },
              ]}
            >
              <FormInput placeholder="Last Name" />
            </FormItem>
          </Col>
          <Col span={11}>
            <FormItem name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
              <FormInput placeholder="Email" />
            </FormItem>
          </Col>
          <Divider style={{ color: 'red', marginTop: '6px' }} />
        </Row>
        <FormItem name="bio" label="Description">
          <TextArea rows={4} />
        </FormItem>
        <Button block type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Wrapper>
  );
};
