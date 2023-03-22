import { Col, Divider, Form, Row, Space } from 'antd';
import { Button } from 'components/button';
import { FormItem } from 'components/form/form-item';
import { Icon } from 'components/icon';
import { Input } from 'components/input';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text, Title } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { SharedWith } from './components/share/shared-with';

export const Share = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    // mutate(values);
  };

  return (
    <div style={{ padding: '32px' }}>
      <VerticalSpace>
        <Title level={3} color={COLORS.PRIMARY.GRAY_DARK}>
          Share
        </Title>
        <Form name="share" form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
          <VerticalSpace size={48}>
            <VerticalSpace size={19}>
              <Row>
                <Col span={24}>
                  <FormItem
                    label="Perspectives"
                    name="perspectives"
                    rules={[{ required: true, message: 'Perspectives is required' }]}
                    style={{ marginBottom: '0' }}
                  >
                    <Input placeholder="Main" />
                  </FormItem>
                </Col>
              </Row>
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
      </VerticalSpace>
    </div>
  );
};
