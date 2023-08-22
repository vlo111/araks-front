import React from 'react';
import { Col, Form, Row, TreeSelect } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetTypes } from 'api/schema/type/use-get-types';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { AddNodeForm } from 'components/form/add-node-form';
import { NodeDataConnectionToSave, ProjectTypePropertyReturnData } from 'api/types';
import { AllDataResponse, NodeBody, NodeDataSubmit, NodePropertiesValues } from 'types/node';
import { PropertyTypes } from 'components/form/property/types';
import { setNodeDataValue } from '../../../../data-sheet/components/table-section/node/utils';
import { Button } from 'components/button';
import { getConnectionFormName } from 'components/form/type/connection-type';
import { useManageNodesGraph } from 'api/visualisation/use-manage-node';
import './add-node-select.css';

export const NodeCreate: React.FC = () => {
  const [form] = Form.useForm();
  const { graph, openNodeCreate, nodes: nodeList, setNodes, finishOpenNodeCreate } = useGraph() ?? {};

  const createNode = (data: NodePropertiesValues) => {
    const nodeData = data as NodePropertiesValues & {
      nodeType: { color: string; id: string; name: string };
      default_image: string;
    };

    const node = {
      id: nodeData.id,
      label: nodeData.name as unknown as string,
      img: nodeData.default_image,
      type: nodeData.default_image ? 'image' : 'circle',
      x: openNodeCreate.x,
      y: openNodeCreate.y,
      nodeType: nodeData.nodeType.id,
      style: {
        stroke: nodeData.nodeType?.color ?? '',
      },
    };

    graph.addItem('node', node);

    const createNode: AllDataResponse = {
      id: nodeData.id,
      default_image: nodeData.default_image,
      name: nodeData.name as unknown as string,
      nodeType: {
        id: nodeData.nodeType.id,
        name: nodeData.nodeType.name,
        color: nodeData.nodeType.color,
      },
      project_id: nodeData.project_id,
      project_type_id: nodeData.project_type_id,
      updated_at: nodeData.updated_at,
    };

    setNodes([...nodeList, createNode]);
  };

  const { mutate } = useManageNodesGraph({
    onSuccess: ({ data, variables }) => {
      createNode(data);

      form.resetFields();
      finishOpenNodeCreate();
    },
  });

  const parent_id = Form.useWatch('parent_id', { form, preserve: true });

  const { isInitialLoading, data: properties } = useGetProjectNodeTypeProperties(parent_id, {
    enabled: !!parent_id,
    onSuccess: () => {
      form.resetFields();
      form.setFieldValue('parent_id', parent_id);
    },
  });

  const { id } = useParams();

  const { nodes } = useGetTypes({ projectId: id ?? '' });

  const onFinish = (values: NodeBody) => {
    const mainData = { name: '', default_image: '' };
    const dataToSubmit = properties
      ?.map((item) => {
        if (item.name === 'name') {
          mainData.name = (values.name as string[]).join('');
          return;
        }
        if (item.name === 'node_icon') {
          mainData.default_image = (values.node_icon as string[]).join('');
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

    const dataToSubmitEdges = properties
      ?.map((item) => {
        const formName = getConnectionFormName(item.name, item.id);
        return item.ref_property_type_id === PropertyTypes.Connection
          ? (values[formName] as NodeDataConnectionToSave[])?.map((itemConn) => ({
              id: itemConn.rowId,
              target_id: itemConn.target_id,
              target_type_id: itemConn.target_type_id,
              project_edge_type_id: itemConn.id,
            }))
          : null;
      })
      .filter(Boolean);

    // debugger;
    //
    // dataToSubmitEdges?.forEach((submitedEdges) => {
    //   submitedEdges?.forEach((edge) => {
    //     const type = properties?.find((p) => p.id === edge.project_edge_type_id);
    //
    //     if (edge.id) {
    //       graph.updateItem(edge.id, {
    //         label: type?.name,
    //       })
    //     }
    //     graph.updateItem(edge.id)
    //   })
    // })

    mutate({
      ...mainData,
      nodes: dataToSubmit,
      edges: dataToSubmitEdges?.flat() || [],
      project_type_id: parent_id || '',
    } as NodeDataSubmit);
  };

  return (
    <Form
      name="add-node-drawer"
      form={form}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      onFinish={onFinish}
    >
      <Drawer
        headerStyle={{
          borderTop: `6px solid ${parent_id ? nodes?.find((n) => n.id === parent_id)?.color : '#CDCDCD'}`,
        }}
        onClose={finishOpenNodeCreate}
        closable={false}
        title={
          <Form.Item name="parent_id" style={{ margin: 0 }}>
            <TreeSelect
              className={'node-type-select'}
              popupClassName={'node-type-popup-select'}
              treeData={createNodesTree(nodes ?? [])}
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Select Type"
              treeDefaultExpandAll
              fieldNames={{ value: 'key' }}
            />
          </Form.Item>
        }
        footer={
          parent_id && (
            <Row gutter={16} justify="center">
              <Col span={4}>
                <Button style={{ marginRight: 8 }} onClick={finishOpenNodeCreate} block>
                  Cancel
                </Button>
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => form.submit()} block>
                  Save
                </Button>
              </Col>
            </Row>
          )
        }
        open={openNodeCreate?.isOpened}
      >
        <AddNodeForm data={properties as ProjectTypePropertyReturnData[]} isInitialLoading={isInitialLoading} />
      </Drawer>
    </Form>
  );
};
