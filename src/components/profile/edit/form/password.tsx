import { useEffect } from 'react';
import { Col, Divider, Form, Row } from 'antd';
import { useAuth } from 'context/auth-context';
import { FormItem } from 'components/form/form-item';
import { FormInput, Input } from 'components/input';
import { Button } from 'components/button';
import { useUpdateProfile } from 'api/profile/use-update-profile';
import { ProfileForm } from 'types/auth';
import { Title } from '../../../typography';

const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;

const rulesConfirmPassword = [
  { required: true, message: 'Repeat password password is required' },
  { min: 9, message: 'The minimum length for this field is 9 characters' },
  { max: 16, message: 'The maximum length for this field is 16 characters' },
  { pattern: passwordRegExp },
  ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
    async validator(_: object, value: string) {
      if (getFieldValue('repeat_password') === value) {
        return await Promise.resolve();
      }
      throw new Error('The two passwords that you entered do not match!');
    },
  }),
];

export const EditPassword = () => {
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
    <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
      <Title>Change Password</Title>
      <Row>
        <Col span={11}>
          <FormItem
            name="old_password"
            label="Old password"
            rules={[
              { required: true, message: 'Old password is required' },
              { min: 3, message: 'The minimum length for this field is 3 characters' },
              { max: 30, message: 'The maximum length for this field is 30 characters' },
            ]}
          >
            <FormInput placeholder="Old Password" />
          </FormItem>
        </Col>
        <Divider style={{ color: 'red', marginTop: '6px' }} />

        <Col span={12}>
          <Form.Item
            name="new_password"
            label="New password"
            rules={[
              { required: true, message: 'New password password is required' },
              { min: 9, message: 'The minimum length for this field is 9 characters' },
              { max: 16, message: 'The maximum length for this field is 16 characters' },
              { pattern: passwordRegExp, message: 'Password must contain at least one uppercase character, one lowercase character and one digit ' }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          {/*<FormItem*/}
          {/*  name="new_password"*/}
          {/*  label="New password"*/}
          {/*  rules={[*/}
          {/*    { required: true, message: 'New password password is required' },*/}
          {/*    { min: 9, message: 'The minimum length for this field is 9 characters' },*/}
          {/*    { max: 16, message: 'The maximum length for this field is 16 characters' },*/}
          {/*    { pattern: passwordRegExp },*/}
          {/*  ]}*/}
          {/*>*/}
          {/*  <FormInput placeholder="New Password" />*/}
          {/*</FormItem>*/}
        </Col>
        <Col span={11} offset={1}>
          <FormItem
            name="repeat_password"
            dependencies={['new_password']}
            hasFeedback
            label="Repeat password"
            rules={rulesConfirmPassword}
          >
            <FormInput placeholder="Repeat Password" />
          </FormItem>
        </Col>
      </Row>
      <Button block type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
};
