import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Col, Form, Row } from 'antd';
import { Button } from 'components/button';
import { ShareInputItemAddon } from 'components/form/share-input-item';
import { useCreatePerspectiveUser } from 'api/perspective/shared-users/use-create-perspective-user';

export const UserForm = () => {
  const [form] = Form.useForm();

  const { perspective } = useSchema() || {};

  const { id } = perspective;

  const { mutate } = useCreatePerspectiveUser({}, id);

  const onFinish = ({ role, ...values }: { role: string; email: string }) => {
    mutate({
      perspective_id: id,
      role: role || 'edit',
      ...values,
    });

    form.resetFields();
  };

  return (
    <Form
      name="share-perspective"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
    >
      <Row gutter={[10, 10]}>
        <Col xs={24} xxl={18}>
          <ShareInputItemAddon />
        </Col>
        <Col xs={24} xxl={6}>
          <Button style={{ height: '2.5rem', padding: '6px' }} block htmlType="submit" type="primary">
            Send Invite
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
