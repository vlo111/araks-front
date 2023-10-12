import React, { useMemo } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { NodeBody } from 'types/node';
import { useGetEdges } from 'api/schema/edge/use-get-edges';
import { useParams } from 'react-router-dom';
import { Select } from 'components/select';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { AddNodeForm } from 'components/form/add-node-form';
import { EdgesCreate, EdgesCreateProperties } from 'types/edges';
import { useManageEdge } from 'api/edges/use-manage-edge';
import './add-edge-select.css';
import { updateConnector } from '../../../../../components/layouts/components/visualisation/helpers/utils';

export const EdgeCreateDrawer: React.FC = () => {
  const [form] = Form.useForm();

  const { id } = useParams();

  const { graph, openEdgeCreate, finishOpenEdgeCreate } = useGraph() || {};

  const selectedEdgeId = Form.useWatch('selectedEdgeId', { form, preserve: true });

  const edge = useMemo(() => openEdgeCreate?.edge._cfg?.model, [openEdgeCreate?.edge]);

  const sourceId = useMemo(() => openEdgeCreate?.edge.getSource()._cfg?.model?.nodeType, [openEdgeCreate?.edge]);

  const targetId = useMemo(() => openEdgeCreate?.edge.getTarget()._cfg?.model?.nodeType, [openEdgeCreate?.edge]);

  const { mutate } = useManageEdge(undefined, {
    onSuccess: (response) => {
      const edgeName = filteredEdges?.find((f) => f.id === selectedEdgeId)?.name ?? '';

      const edge = (response as { data: EdgesCreate }).data;

      /* Remove fake edge */
      graph.removeItem(openEdgeCreate?.edge.getID());

      graph.addItem('edge', {
        id: edge.id,
        project_edge_type_id: edge.project_edge_type_id,
        source: edge.source_id,
        target: edge.target_id,
        label: edgeName,
      });

      updateConnector(graph);

      finishOpenEdgeCreate();

      form.resetFields();
    },
  });

  const { isInitialLoading, data } = useGetProjectsEdgeTypeProperties(selectedEdgeId, {
    enabled: !!selectedEdgeId,
    onSuccess: () => {
      form.resetFields();
      form.setFieldValue('selectedEdgeId', selectedEdgeId);
    },
  });

  const { edges } = useGetEdges({ projectId: id ?? '' });

  const filteredEdges = useMemo(
    () => edges?.filter((p) => p.source_id === sourceId && p.target_id === targetId),
    [edges, sourceId, targetId]
  );

  const onFinish = (values: NodeBody) => {
    const dataToSubmit = {
      project_edge_type_id: selectedEdgeId,
      target_type_id: targetId,
      target_id: edge?.target,
      source_type_id: sourceId,
      source_id: edge?.source,
      properties: data?.properties.reduce((curr, item) => {
        return [
          ...curr,
          {
            edge_type_property_id: item.id,
            edge_type_property_type: item.ref_property_type_id,
            data: values[item.name] as (string | number)[],
          },
        ] as EdgesCreateProperties[];
      }, [] as EdgesCreateProperties[]),
    } as EdgesCreate;

    mutate(dataToSubmit);
  };

  const onClose = () => {
    finishOpenEdgeCreate();
    form.resetFields();

    graph.removeItem(openEdgeCreate.edge.getID());
  };

  return (
    <Form
      name="add-edge-drawer"
      form={form}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      onFinish={onFinish}
    >
      <Drawer
        className="add-edge-drawer"
        onClose={onClose}
        closable={false}
        title={
          <Form.Item name="selectedEdgeId" style={{ margin: 0 }}>
            <Select
              className={'node-type-select edge-type-select'}
              popupClassName={'node-type-popup-select'}
              options={filteredEdges?.map((e) => ({ id: e.id, label: e.name, value: e.id }))}
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Select Connection Type"
              fieldNames={{ value: 'id' }}
            />
          </Form.Item>
        }
        footer={
          selectedEdgeId && (
            <Row gutter={16} justify="center">
              <Col span={10}>
                <Button style={{ marginRight: 8 }} onClick={onClose} block>
                  Cancel
                </Button>
              </Col>
              <Col span={10}>
                <Button type="primary" onClick={() => form.submit()} block>
                  Save
                </Button>
              </Col>
            </Row>
          )
        }
        open={openEdgeCreate?.isOpened}
      >
        <AddNodeForm data={data?.properties} isInitialLoading={isInitialLoading} />
      </Drawer>
    </Form>
  );
};
