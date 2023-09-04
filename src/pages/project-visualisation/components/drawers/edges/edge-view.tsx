import { useMemo, useState } from 'react';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { Col, Form, Row } from 'antd';
import { EdgeType, NodeBody } from 'types/node';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { VerticalSpace } from 'components/space/vertical-space';
import { COLORS } from 'helpers/constants';
import { getRowData } from '../../../../data-sheet/components/table-section/node/utils';
import { EdgeViewTitle } from './edge-view-title';
import { Button } from 'components/button';
import { AddNodeForm } from 'components/form/add-node-form';
import { SourceView } from './view/source';
import { useManageEdge } from 'api/edges/use-manage-edge';
import { EdgesCreate } from 'types/edges';
import './add-edge-select.css';

export const EdgeViewDrawer = () => {
  const [form] = Form.useForm();

  const [isEdit, setIsEdit] = useState(false);

  const { graph, openEdge, finishOpenEdge } = useGraph() ?? {};

  const edge = useMemo(
    () => graph?.getEdges()?.find((e) => e?.getID && (e?.getID() === openEdge?.id ?? '')),
    [graph, openEdge?.id]
  );

  const { mutate } = useManageEdge(openEdge?.id || '', {
    onSuccess: () => {
      onClose();
    },
  });

  const source = useMemo(() => graph?.getNodes()?.find((n) => n?.getID() === edge?.getModel()?.source), [graph, edge]);

  const target = useMemo(() => graph?.getNodes()?.find((n) => n?.getID() === edge?.getModel()?.target), [graph, edge]);

  const { isInitialLoading, data } = useGetProjectsEdgeTypeProperties(
    (edge?.getModel() as { project_edge_type_id: string })?.project_edge_type_id,
    {
      enabled: !!edge,
      onSuccess: () => {
        form.resetFields();
      },
    }
  );

  const onClose = () => {
    finishOpenEdge();
    form.resetFields();
    setIsEdit(false);
  };

  const onFinish = (values: NodeBody) => {
    mutate({
      source_id: source?.getID(),
      target_id: target?.getID(),
      ...values,
    } as EdgesCreate);
  };

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
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            id={edge?.getID() as string}
            name={data?.name ?? ''}
            onClose={onClose}
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
        <Row gutter={8} style={{ margin: '1rem 0' }}>
          <Col span={8}>
            <SourceView
              sourceData={source?.getModel().nodeType as EdgeType}
              nodeName={source?.getModel().label as string}
            />
          </Col>
          <Col span={1} />
          <Col span={8}>
            <SourceView
              sourceData={target?.getModel().nodeType as EdgeType}
              nodeName={target?.getModel().label as string}
            />
          </Col>
        </Row>
        {isEdit ? (
          <AddNodeForm data={data?.properties} isInitialLoading={isInitialLoading} />
        ) : (
          <VerticalSpace>
            {data?.properties ? (
              data.properties.map((d) => {
                return (
                  <VerticalSpace key={d.id}>
                    <div color={COLORS.PRIMARY.BLUE}>{d.name}</div>
                    {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      getRowData(d)
                    }
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
