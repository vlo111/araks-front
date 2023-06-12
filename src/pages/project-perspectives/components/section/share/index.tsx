import { useSchema } from 'components/layouts/components/schema/wrapper';
import { InputAddon } from 'components/form/input-addon';
import { CSSProperties } from 'react';
import { Drawer } from 'components/drawer/perspective-drawer';
import { Col, Divider, Form, Row, Space } from "antd";
import { Button } from '../../../../../components/button';
import { VerticalSpace } from "../../../../../components/space/vertical-space";
import { Icon } from "../../../../../components/icon";
import { Text } from "../../../../../components/typography";
import { SharedWith } from "../../../../project-overview/components/share/shared-with";

export const containerStyle: CSSProperties = {
  position: 'fixed',
  height: 'calc(100% - 9.5rem)',
  width: '100%',
  right: '600px',
  top: '9.5rem',
  overflow: 'hidden',
  zIndex: -1,
};

export const Share = () => {
  const { perspective, startPerspectiveShare } = useSchema() || {};

  const onClose = () => {
    startPerspectiveShare({ openShare: false, sharedUsers: [] });
  };

  const [form] = Form.useForm();

  const onFinish = (values: { role: string, email: string }) => {
    // eslint-disable-next-line no-console
    console.log({
      perspective_id: perspective.id,
      ...values
    });
    // mutate(values);
  };

  return (
    <div style={{ ...containerStyle, visibility: perspective?.openShare ? 'inherit' : 'hidden' }}>
      <Drawer onClose={onClose} open={perspective?.openShare ?? false}>
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
              <InputAddon />
            </Col>
            <Col xs={24} xxl={6}>
              <Button block htmlType="submit" type="primary">
                Send Invite
              </Button>
            </Col>
          </Row>
        </Form>
        <VerticalSpace size={8}>
          <Space size={9} style={{ lineHeight: 1 }}>
            <Icon color="#C5C5C5" icon="public" size={20} />
            <Text>Shared users</Text>
          </Space>
          <Divider style={{ margin: '0', backgroundColor: '#C5C5C5' }} />
          <SharedWith />
        </VerticalSpace>
      </Drawer>
    </div>
  );
};
