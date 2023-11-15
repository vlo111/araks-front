import { Col, Drawer, Form, Row, Spin } from 'antd';
import { useManageEdge } from 'api/edges/use-manage-edge';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { Button } from 'components/button';
import { AddConnectionNodeForm } from 'components/form/add-connection-node-form';
import { PropertyTypes } from 'components/form/property/types';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useState } from 'react';
import { EdgesCreate, EdgesCreateProperties, EdgeSourceData, EdgeTargetData } from 'types/edges';
import { NodeBody } from 'types/node';
import styled from 'styled-components';

const AddConnectionButton = styled(Button)`
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  border: none;
  justify-content: 'center';
`;
export const ManageConnection = () => {
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

  const { mutate, isLoading } = useManageEdge();

  const [form] = Form.useForm();

  const onFinish = (values: NodeBody) => {
    const dataToSubmit = {
      project_edge_type_id: nodeTypeId,
      target_type_id: (values.targetData as EdgeTargetData[])[0].target_type_id,
      target_id: (values.targetData as EdgeTargetData[])[0].target_id,
      source_type_id: (values.sourceData as EdgeSourceData[])[0].source_type_id,
      source_id: (values.sourceData as EdgeSourceData[])[0].source_id,
      properties:
        data?.properties.reduce((curr, item) => {
          return [
            ...curr,
            {
              edge_type_property_id: item.id,
              edge_type_property_type: item.ref_property_type_id,
              data: (values[item.name] as (string | number)[])[0]
                ? [
                    item.ref_property_type_id === PropertyTypes.Integer ||
                    (item.ref_property_type_id === PropertyTypes.Decimal &&
                      typeof values[item.name] !== 'undefined' &&
                      values[item.name] !== null)
                      ? +(values[item.name] as (string | number)[])[0]
                      : (values[item.name] as (string | number)[])[0],
                  ]
                : [],
            },
          ] as EdgesCreateProperties[];
        }, [] as EdgesCreateProperties[]) || [],
    } as EdgesCreate;

    mutate(dataToSubmit);
    onClose();
  };

  return (
    <Spin spinning={isLoading}>
      <AddConnectionButton onClick={onOpen} type='primary'>+ Add Connection </AddConnectionButton>
      <Drawer
        title={`Add Connection / ${titleText}`}
        closable={false}
        onClose={onClose}
        open={open}
        placement="top"
        contentWrapperStyle={{ margin: '0 20%', height: '100%' }}
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
    </Spin>
  );
};
