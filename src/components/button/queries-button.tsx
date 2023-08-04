import { Col, Drawer, Form, Row } from 'antd';
import { useOverview } from 'context/overview-context';
import { Button } from '.';

export const QueriesButton = () => {
  const { hideLeftSection, setHideLeftSection } = useOverview();
  const [form] = Form.useForm();

  const onClose = () => {
    setHideLeftSection(false);
    form.resetFields();
  };

  return (
    <Drawer
      title={'Queries'}
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
      contentWrapperStyle={{ height: '100%' }}
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
    ></Drawer>
  );
};
