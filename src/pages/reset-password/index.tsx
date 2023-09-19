import { useSearchParams, useNavigate } from 'react-router-dom';
import { useResetPassword } from 'api/auth/use-reset-password';
import { Col, Form, Row } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { MenuText, Title } from 'components/typography';
import { COLORS, PATHS } from 'helpers/constants';
import { FormItem } from 'components/form/form-item';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { rulesPassword } from 'components/profile/edit/utils';

export const ResetPassword = () => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { mutate } = useResetPassword({
    onSuccess: (data) => {
      return data && navigate(PATHS.SIGN_IN);
    },
  });

  const onFinish = ({ new_password }: { new_password: string }) => {
    if (token) {
      mutate({ token, new_password });
    }
  };
  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: '70vh' }}>
        <Col span={24}>
          <Form
            name="resetpassword"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
          >
            <VerticalSpace size="middle">
              <div>
                <Title level={2} style={{ color: COLORS.PRIMARY.BLUE }}>
                  Creating a New Password
                </Title>
                <MenuText style={{ color: COLORS.PRIMARY.GRAY }}>Welcome back! Please enter your details.</MenuText>
              </div>
              <div>
                <FormItem name="new_password" label="New Password" rules={rulesPassword}>
                  <Input.Password />
                </FormItem>
                <FormItem name="confirm_password" label="Repeat Password" rules={rulesPassword}>
                  <Input.Password />
                </FormItem>
              </div>
              <VerticalSpace size="middle">
                <Button htmlType="submit" block type="primary">
                  Confirm
                </Button>
              </VerticalSpace>
            </VerticalSpace>
          </Form>
        </Col>
      </Row>
    </>
  );
};
