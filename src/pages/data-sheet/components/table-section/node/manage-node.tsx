import { Col, Drawer, Form, Row } from 'antd';
import { useManageNodes } from 'api/node/use-manage-node';
import { Button } from 'components/button';
import { HorizontalButton } from 'components/button/horizontal-button';
import { AddNodeForm } from 'components/form/add-node-form';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useState } from 'react';
import { NodeBody, NodeDataSubmit } from 'types/node';

type Props = {
  tableHead: number;
};

export const ManageNode = ({ tableHead }: Props) => {
  const [open, setOpen] = useState(false);
  const { titleText, nodeTypeId } = useDataSheetWrapper();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onOpen = () => {
    setOpen(true);
  };

  const { mutate } = useManageNodes();

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    right: 0,
    top: `${tableHead}px`,
    overflow: 'hidden',
    textAlign: 'center',
    paddingLeft: '64px',
    paddingRight: '64px',
  };
  const [form] = Form.useForm();

  const onFinish = (values: NodeBody) => {
    mutate({
      nodes: values,
      project_type_id: nodeTypeId || '',
    } as NodeDataSubmit);
    onClose();
  };
  return (
    <>
      <HorizontalButton tableHead={tableHead} openForm={onOpen} formIsOpened={open} />
      <div style={containerStyle}>
        <Drawer
          title={`Add New Node / ${titleText}`}
          placement="top"
          closable={false}
          onClose={onClose}
          open={open}
          getContainer={false}
          contentWrapperStyle={{ marginRight: '135px', marginLeft: '135px', height: '100%' }}
          footer={
            <Row gutter={16} justify="center">
              <Col span={4}>
                <Button style={{ marginRight: 8 }} onClick={onClose} block>
                  Cancel
                </Button>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => form.submit()} block>
                  Save
                </Button>
              </Col>
            </Row>
          }
        >
          <Form
            name="project-node-manage"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
          >
            <AddNodeForm />
          </Form>
        </Drawer>
      </div>
    </>
  );
};
