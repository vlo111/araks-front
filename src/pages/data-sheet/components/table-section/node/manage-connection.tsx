import { Col, Drawer, Form, Row } from 'antd';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { useManageNodes } from 'api/node/use-manage-node';
import { Button } from 'components/button';
import { HorizontalButton } from 'components/button/horizontal-button';
import { AddConnectionNodeForm } from 'components/form/add-connection-node-form';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useState } from 'react';
import { NodeBody } from 'types/node';

type Props = {
  tableHead: number;
  tableHeight: undefined | number;
};

export const ManageConnection = ({ tableHead, tableHeight }: Props) => {
  const [open, setOpen] = useState(false);
  const { titleText, nodeTypeId, isConnectionType } = useDataSheetWrapper();

  const { isInitialLoading, data } = useGetProjectsEdgeTypeProperties(nodeTypeId, {
    enabled: !!(nodeTypeId && isConnectionType === true),
  });

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onOpen = () => {
    setOpen(true);
  };

  const { mutate } = useManageNodes();

  const [form] = Form.useForm();

  const onFinish = (values: NodeBody) => {
    onClose();
  };

  return (
    <>
      <HorizontalButton tableHead={tableHead} openForm={onOpen} formIsOpened={open} />
      <Drawer
        title={`Add New Node / ${titleText}`}
        placement="top"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
        contentWrapperStyle={{
          marginRight: '135px',
          marginLeft: '135px',
          height: `${tableHeight}px`,
        }}
        bodyStyle={{ backgroundColor: '#F2F2F2', padding: '40px 0' }}
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
          name="project-connection-node-manage"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
        >
          <AddConnectionNodeForm data={data as EdgeTypePropertiesResponse} isInitialLoading={isInitialLoading} />
        </Form>
      </Drawer>
    </>
  );
};
