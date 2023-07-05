import { Col, Drawer, Form, Row } from 'antd';
import { useManageEdge } from 'api/edges/use-manage-edge';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { Button } from 'components/button';
import { HorizontalButton } from 'components/button/horizontal-button';
import { AddConnectionNodeForm } from 'components/form/add-connection-node-form';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useState } from 'react';
import { EdgesCreate, EdgesCreateProperties, EdgeSourceData, EdgeTargetData } from 'types/edges';
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

  const { mutate } = useManageEdge();

  const [form] = Form.useForm();

  const onFinish = (values: NodeBody) => {
    const dataToSubmit = {
      project_edge_type_id: nodeTypeId,
      target_type_id: (values.targetData as EdgeTargetData[])[0].target_type_id,
      target_id: (values.targetData as EdgeTargetData[])[0].target_id,
      source_type_id: (values.sourceData as EdgeSourceData[])[0].source_type_id,
      source_id: (values.sourceData as EdgeSourceData[])[0].source_id,
      properties: data?.properties.reduce((curr, item) => {
        return [
          ...curr,
          {
            edge_type_property_id: item.id,
            edge_type_property_type: item.ref_property_type_id,
            data: (values[item.name] as (string | number)[])[0],
          },
        ] as EdgesCreateProperties[];
      }, [] as EdgesCreateProperties[]),
    } as EdgesCreate;

    mutate(dataToSubmit);
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
