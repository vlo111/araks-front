import { Col, Form, Row } from "antd"
import { useSignIn } from "api/auth/use-sign-in";
import { SignInForm } from "types/auth";
import { Button, SignUpButton } from "../../components/button";
import { FormItem } from "../../components/form/form-item";
import { Input } from "../../components/input";
import VerticalSpace from "../../components/space/vertical-space";
import { MenuText, SecondaryText, Title } from "../../components/typography";
import { COLORS } from "../../helpers/constants";

export const SignIn = () => {
    const [form] = Form.useForm();

    const { mutate } = useSignIn();

    const onFinish = (values: SignInForm) => {
        mutate(values);
    };

    return <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={24}>
            <Form
                name="signin"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                requiredMark={false}
            >
                <VerticalSpace size="large">
                    <div>
                        <Title level={1}>Welcome to Araks</Title>
                        <MenuText style={{color: COLORS.PRIMARY.GRAY}}>Please enter your details.</MenuText>
                    </div>
                    <div>
                        <FormItem name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
                            <Input />
                        </FormItem>
                        <FormItem
                            name="password"
                            label="Password" 
                            rules={[{ required: true, min: 6 }]} 
                            extra={<a href="/forgot-password">
                                <SecondaryText>Forgot Password?</SecondaryText>
                            </a>}
                        >
                            <Input.Password />
                        </FormItem>
                    </div>
                    <VerticalSpace size="middle">
                        <Button htmlType="submit" block type="primary">
                            Sign In
                        </Button>
                        <SignUpButton iconType='azure' />
                    </VerticalSpace>
                </VerticalSpace>
            </Form>
        </Col>
  </Row>
}