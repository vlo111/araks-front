import { Col, Drawer, Form, Row, Spin, UploadFile } from 'antd';
import { useManageNodes } from 'api/node/use-manage-node';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { NodeDataConnectionToSave, ProjectTypePropertyReturnData } from 'api/types';
import { Button } from 'components/button';
import { HorizontalButton } from 'components/button/horizontal-button';
import { AddNodeForm } from 'components/form/add-node-form';
import { PropertyTypes } from 'components/form/property/types';
import { getConnectionFormName } from 'components/form/type/connection-type';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useState } from 'react';
import { NodeBody, NodeDataSubmit } from 'types/node';
import { setNodeDataValue } from './utils';

type Props = {
  tableHead: number;
  tableHeight: undefined | number;
};

export const ManageNode = ({ tableHead, tableHeight }: Props) => {
  const [stopSubmit, setStopSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const { titleText, nodeTypeId, isConnectionType } = useDataSheetWrapper();

  /** properties to draw the form */
  const { isInitialLoading, data } = useGetProjectNodeTypeProperties(nodeTypeId, {
    enabled: !!(nodeTypeId && isConnectionType === false),
  });

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onOpen = () => {
    setOpen(true);
  };

  const { mutate, isLoading } = useManageNodes();

  const [form] = Form.useForm();

  const onFinish = (values: NodeBody) => {
    const mainData = { name: '', default_image: '' };
    const dataToSubmit = data
      ?.map((item) => {
        if (item.name === 'name') {
          mainData.name = (values.name as string[]).join('');
          return;
        }
        if (item.name === 'node_icon') {
          mainData.default_image = values.node_icon
            ? (values.node_icon as UploadFile[])?.[0].response.data.uploadPath
            : '';
          return;
        }

        return item.ref_property_type_id !== PropertyTypes.Connection
          ? {
              project_type_property_id: item.id,
              project_type_property_type: item.ref_property_type_id,
              nodes_data: setNodeDataValue(item, values),
            }
          : null;
      })
      .filter(Boolean);
    const dataToSubmitEdges = data
      ?.map((item) => {
        const formName = getConnectionFormName(item.name, item.id);
        return item.ref_property_type_id === PropertyTypes.Connection
          ? (values[formName] as NodeDataConnectionToSave[])?.map((itemConn) => ({
              target_id: itemConn.target_id,
              target_type_id: itemConn.target_type_id,
              project_edge_type_id: itemConn.id,
            }))
          : null;
      })
      .filter(Boolean);

    mutate({
      ...mainData,
      nodes: dataToSubmit,
      edges: dataToSubmitEdges?.flat() || [],
      project_type_id: nodeTypeId || '',
    } as NodeDataSubmit);
    onClose();
  };

  return (
    <Spin spinning={isLoading}>
      <HorizontalButton tableHead={tableHead} openForm={onOpen} formIsOpened={open} />
      <Drawer
        title={`Add New Node / ${titleText}`}
        placement="top"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
        contentWrapperStyle={{ marginRight: '135px', marginLeft: '135px', height: `${tableHeight}px` }}
        footer={
          <Row gutter={16} justify="center">
            <Col span={4}>
              <Button style={{ marginRight: 8 }} onClick={onClose} block>
                Cancel
              </Button>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={() => form.submit()} block disabled={stopSubmit}>
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
          <AddNodeForm
            data={data as ProjectTypePropertyReturnData[]}
            isInitialLoading={isInitialLoading}
            setStopSubmit={setStopSubmit}
          />
        </Form>
      </Drawer>
    </Spin>
  );
};
