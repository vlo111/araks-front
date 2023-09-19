import { useState } from 'react';
import { Col, Form, Row } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { MenuText, Title } from 'components/typography';
import { COLORS, PATHS } from 'helpers/constants';
import { FormItem } from 'components/form/form-item';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Link } from 'react-router-dom';
import { useForgotPassword } from 'api/auth/use-forgot-password';
import { StyledBackToSection, StyledCheckEmail } from './styles';
import { ForgotPasswordForm } from 'types/auth';

export const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState('');
  const [form] = Form.useForm();
  const { mutate } = useForgotPassword({
    onSuccess: (data) => {
      setEmailSent(data);
    },
  });

  const onFinish = ({ email }: ForgotPasswordForm) => {
    mutate(email);
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: '70vh' }}>
        <Col span={24}>
          {emailSent ? (
            <div>
              <StyledCheckEmail>Check your Email for the link.</StyledCheckEmail>
              <VerticalSpace size="middle">
                <Link to={PATHS.ROOT}>
                  <Button block>Back to Homepage</Button>
                </Link>
              </VerticalSpace>
            </div>
          ) : (
            <>
              <Form
                name="forgotpassword"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                requiredMark={false}
              >
                <VerticalSpace size="large">
                  <div>
                    <Title level={1}>Welcome to Araks</Title>
                    <MenuText style={{ color: COLORS.PRIMARY.GRAY }}>Please enter your details.</MenuText>
                  </div>
                  <FormItem name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
                    <Input />
                  </FormItem>
                </VerticalSpace>
                <VerticalSpace size="middle">
                  <Button htmlType="submit" block type="primary">
                    Send
                  </Button>
                </VerticalSpace>
                <StyledBackToSection>
                  <Link to={PATHS.SIGN_IN}>
                    <Button htmlType="submit" block>
                      Back to Sign in
                    </Button>
                  </Link>
                </StyledBackToSection>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};
