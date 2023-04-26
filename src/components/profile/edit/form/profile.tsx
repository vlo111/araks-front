import { useEffect } from 'react';
import { Col, Divider, Form, Row } from 'antd';
import { useAuth } from 'context/auth-context';
import { FormItem } from 'components/form/form-item';
import { FormInput, TextArea } from 'components/input';
import { Button } from 'components/button';
import { useUpdateProfile } from 'api/profile/use-update-profile';
import { ProfileForm } from 'types/auth';

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
        <TextArea rows={4} maxLength={250} />
      </FormItem>
      <Button block type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
};
