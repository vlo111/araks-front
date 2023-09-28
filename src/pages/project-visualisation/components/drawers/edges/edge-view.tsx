import { useState } from 'react';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Col, Form, Row } from 'antd';
import { NodeBody } from 'types/node';
import { VerticalSpace } from 'components/space/vertical-space';
import { EdgeViewTitle } from './edge-view-title';
import { Button } from 'components/button';
import { SourceView } from './components/source';
import { useProject } from 'context/project-context';
import { UserProjectRole } from 'api/types';
import { getConnectionData } from './utils';
import { useGetEdgeProperties } from 'api/visualisation/use-get-edge-property';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { EdgeEditView } from './edge-edit';
import { convertByType } from 'helpers/utils';
import { PropertyTypes } from 'components/form/property/types';
import { useManageEdgeGraph } from 'api/visualisation/use-manage-edge';
import './add-edge-select.css';

export const EdgeViewDrawer = () => {
  const [form] = Form.useForm();

  const { projectInfo } = useProject();

  const [isEdit, setIsEdit] = useState(false);

  const { openEdge, finishOpenEdge } = useGraph() ?? {};

  const { mutate } = useManageEdgeGraph();

  const { data: edgeValues } = useGetEdgeProperties(openEdge?.id ?? '', {
    enabled: !!openEdge?.id,
  });

  const { isInitialLoading, data } = useGetProjectsEdgeTypeProperties(edgeValues?.project_edge_type_id, {
    enabled: !!edgeValues?.id,
    onSuccess: (data) => {
      form.resetFields();

      form.setFieldsValue({
        ...data.properties.reduce((acc, prop) => {
          const currentValue = edgeValues?.properties?.find((property) => property.edge_type_property_id === prop.id);
          const newValue = convertByType(currentValue?.data ?? [], prop.ref_property_type_id as PropertyTypes);

          if (prop.ref_property_type_id === 'date' || prop.ref_property_type_id === 'datetime') {
            return {
              ...acc,
              [prop.name]: newValue,
            };
          }

          return {
            ...acc,
            [prop.name]: newValue ? (Array.isArray(newValue) ? newValue : [newValue ?? null]) : null,
          };
        }, {}),
      });
    },
  });

  const onClose = () => {
    finishOpenEdge();
    setIsEdit(false);
  };

  const onFinish = (values: NodeBody) => {
    const properties = edgeValues?.properties.map((item) => {
      const newData = data?.properties.find((p) => p.id === item.edge_type_property_id)?.name ?? '';

      const value = (Array.isArray(values[newData]) ? values[newData] : values[newData] ? [values[newData]] : []) as (
        | string
        | number
      )[];

      return {
        id: item.id,
        edge_type_property_id: item.edge_type_property_id,
        edge_type_property_type: item.edge_type_property_type,
        data: value,
      };
    });

    const dataToSubmit = {
      source_id: edgeValues?.source.id,
      target_id: edgeValues?.target.id,
      properties: properties || [],
    };

    onClose();

    mutate({ id: openEdge?.id, ...dataToSubmit });
  };

  const canEdit = projectInfo?.role === UserProjectRole.Owner || projectInfo?.role === UserProjectRole.Editor;

  return (
    <Form
      name="add-edge-view-drawer"
      form={form}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      onFinish={onFinish}
    >
      <Drawer
        className="add-edge-drawer"
        closable={false}
        open={openEdge?.isOpened}
        title={
          <EdgeViewTitle
            id={openEdge?.id ?? ''}
            name={data?.name ?? ''}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            onClose={onClose}
            canEdit={canEdit}
          />
        }
        footer={
          isEdit && (
            <Row gutter={16} justify="center">
              <Col span={4}>
                <Button style={{ marginRight: 8 }} onClick={() => setIsEdit(false)} block>
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
        onClose={onClose}
      >
        <Row gutter={8} style={{ margin: '1rem 0' }} justify={'center'}>
          <Col span={8}>
            <SourceView sourceData={edgeValues?.source.nodeType} nodeName={edgeValues?.source.name} />
          </Col>
          <Col span={1} />
          <Col span={8}>
            <SourceView sourceData={edgeValues?.target.nodeType} nodeName={edgeValues?.target.name} />
          </Col>
        </Row>
        {isEdit ? (
          <EdgeEditView
            isInitialLoading={isInitialLoading}
            properties={edgeValues?.properties}
            names={data?.properties}
          />
        ) : (
          <VerticalSpace>
            {edgeValues?.properties ? (
              edgeValues.properties.map((d) => {
                return (
                  <VerticalSpace key={d.id}>
                    <div>{data?.properties?.find((p) => p.id === d.edge_type_property_id)?.name}</div>
                    {getConnectionData(d)}
                  </VerticalSpace>
                );
              })
            ) : (
              <></>
            )}
          </VerticalSpace>
        )}
      </Drawer>
    </Form>
  );
};
