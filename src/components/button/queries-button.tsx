import { Col, Drawer, Form, Row } from 'antd';
import { useState } from 'react';
import { Button } from '.';

export const QueriesButton = () => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Drawer
        title={'Queries'}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        width="30vw"
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
                Run Serarch
              </Button>
            </Col>
          </Row>
        }
      ></Drawer>
      <Button type="primary" onClick={onOpen} block>
        Queries
      </Button>
    </>
  );
};
