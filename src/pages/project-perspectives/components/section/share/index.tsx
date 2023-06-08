import { Col, Divider, Drawer, Form, Row, Space } from 'antd';
import { containerStyle, contentStyle, drawerStyle, maskStyle } from './style';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { VerticalSpace } from 'components/space/vertical-space';
import { FormItem } from 'components/form/form-item';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Text } from 'components/typography';
import { SharedWith } from '../../../../project-overview/components/share/shared-with';

export const Share = () => {
  const {
    perspective,
    startPerspectiveShare,
  } = useSchema() || {};

  const onClose = () => {
    startPerspectiveShare({ openShare: false });
  };

  const [form] = Form.useForm();

  const onFinish = () => {
    // mutate(values);
  };

  return (
    <>
      <div style={{ ...containerStyle, visibility: perspective?.openShare ? 'inherit' : 'hidden' }}>
        <Drawer
          title="Share"
          placement="right"
          onClose={onClose}
          open={perspective?.openShare ?? false}
          getContainer={false}
          contentWrapperStyle={contentStyle}
          drawerStyle={drawerStyle}
          maskStyle={maskStyle}
        >
          <Form
            name="share-perspective"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
          >
            <VerticalSpace size={48}>
              <VerticalSpace size={19}>
                <Row gutter={[37, 19]}>
                  <Col xs={24} xxl={16}>
                    <FormItem
                      name="email"
                      rules={[{ required: true, message: 'Perspectives is required' }]}
                      style={{ marginBottom: '0' }}
                    >
                      <Input placeholder="Email" />
                    </FormItem>
                  </Col>
                  <Col xs={24} xxl={8}>
                    <Button block type="primary">
                      Send Invite
                    </Button>
                  </Col>
                </Row>
              </VerticalSpace>
              <VerticalSpace size={8}>
                <Space size={9} style={{ lineHeight: 1 }}>
                  <Icon color="#C5C5C5" icon="public" size={20} />
                  <Text>Anyone with the link</Text>
                </Space>
                <Divider style={{ margin: '0', backgroundColor: '#C5C5C5' }} />
                <SharedWith />
              </VerticalSpace>
            </VerticalSpace>
          </Form>
        </Drawer>
      </div>
    </>
  );
};
