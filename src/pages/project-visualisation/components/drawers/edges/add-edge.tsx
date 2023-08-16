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
import './add-edge-select.css';
import { EdgesCreate, EdgesCreateProperties, EdgeSourceData, EdgeTargetData } from '../../../../../types/edges';
import { PropertyTypes } from '../../../../../components/form/property/types';
import { useManageEdge } from '../../../../../api/edges/use-manage-edge';

export const EdgeCreate: React.FC = () => {
  const [form] = Form.useForm();

  const { id } = useParams();
  const { graph, openEdge, finishOpenEdge } = useGraph() || {};

  const selectedEdgeId = Form.useWatch('selectedEdgeId', { form, preserve: true });

  const sourceId = useMemo(() => openEdge?.edge.getSource()._cfg?.model?.nodeType, [openEdge?.edge]);
  const targetId = useMemo(() => openEdge?.edge.getTarget()._cfg?.model?.nodeType, [openEdge?.edge]);

  const { mutate } = useManageEdge(selectedEdgeId || '', {
    onSuccess: () => {
      onClose();
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
    debugger;
    const dataToSubmit = {
      target_id: (values.targetData as EdgeTargetData[])[0].target_id,
      source_id: (values.sourceData as EdgeSourceData[])[0].source_id,
      properties: data?.properties.reduce((curr, item) => {
        // const property = data?.properties?.find((prop) => prop.edge_type_property_id === item.id);

        return [
          ...curr,
          {
            id: 'property?.id',
            edge_type_property_id: item.id,
            edge_type_property_type: item.ref_property_type_id,
            data:
              item.ref_property_type_id === PropertyTypes.Integer || item.ref_property_type_id === PropertyTypes.Decimal
                ? +(values[item.name] as (string | number)[])[0]
                : (values[item.name] as (string | number)[])[0],
          },
        ] as EdgesCreateProperties[];
      }, [] as EdgesCreateProperties[]),
    } as EdgesCreate;

    mutate(dataToSubmit);

    onClose();
  };

  const onClose = () => {
    finishOpenEdge();
    form.resetFields();

    graph.removeItem(openEdge.edge.getID());
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
        }
        open={openEdge?.isOpened}
      >
        <AddNodeForm data={data?.properties} isInitialLoading={isInitialLoading} />
      </Drawer>
    </Form>
  );
};
