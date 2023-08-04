import { CaretRightOutlined } from '@ant-design/icons';
import { Col, Drawer, Form, Row, Space } from 'antd';
import { QueriesForm } from 'components/form/all-data/queries-form';
import { useOverview } from 'context/overview-context';
import { Button } from '.';

export const QueriesButton = () => {
  const { hideLeftSection, setHideLeftSection } = useOverview();
  const [form] = Form.useForm();

  const onClose = () => {
    setHideLeftSection(false);
    form.resetFields();
  };

  const onFinish = (values: unknown) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  return (
    <Form
      name="all-data-query-filter"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
    >
      <Drawer
        className="queries-filter-drawer"
        title={
          <Row justify="space-between">
            <Col span={6}>
              <Space>
                <CaretRightOutlined onClick={onClose} />
                Queries
              </Space>
            </Col>
            <Col span={6}></Col>
          </Row>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        open={hideLeftSection}
        mask={false}
        getContainer={false}
        afterOpenChange={(open) => {
          if (!open) {
            setHideLeftSection(false);
          }
        }}
        width="100%"
        contentWrapperStyle={{ height: '100%', overflowY: 'auto' }}
        footerStyle={{ zIndex: 3, background: '#F2F2F2' }}
        footer={
          <Row gutter={16} justify="center">
            <Col span={6}>
              <Button style={{ marginRight: 8 }} onClick={onClose} block>
                Save
              </Button>
            </Col>
            <Col span={65}>
              <Button type="primary" onClick={() => form.submit()} block>
                Run Search
              </Button>
            </Col>
          </Row>
        }
      >
        <QueriesForm />
      </Drawer>
    </Form>
  );
};
