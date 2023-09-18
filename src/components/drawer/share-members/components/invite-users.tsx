import { Col, Form, Row } from 'antd';
import { LabelName } from '../styles';
import { VerticalSpace } from '../../../space/vertical-space';
import { ShareInputItemAddon } from '../../../form/share-input-item';
import { Button } from '../../../button';
import { PerspectiveSelect } from '../../../select/perspective-select';
import { useCreatePerspectiveUser } from 'api/perspective/shared-users/use-create-perspective-user';

export const InviteUsers = ({ id }: { id: string }) => {
  const [form] = Form.useForm();

  const { mutate } = useCreatePerspectiveUser({}, id);

  const onFinish = ({ role, perspective, email }: { perspective: string; role: string; email: string }) => {
    mutate({
      perspective_id: perspective || id,
      role: role || 'edit',
      email,
    });
    form.setFieldValue('email', '');
  };

  return (
    <Form name="share" form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
      <VerticalSpace>
        <Row align="bottom">
          <Col xs={10}>
            <LabelName>Perspectives</LabelName>
            <PerspectiveSelect />
          </Col>
          <Col offset={1} xs={8}>
            <ShareInputItemAddon />
          </Col>
          <Col offset={1} xs={4}>
            <Button htmlType="submit" block type="primary" style={{ marginBottom: '24px', height: '40px' }}>
              Send Invite
            </Button>
          </Col>
        </Row>
      </VerticalSpace>
    </Form>
  );
};
