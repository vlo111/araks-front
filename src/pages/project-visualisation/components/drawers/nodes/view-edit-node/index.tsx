import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { groupedData, setNodeDataUpdateValue } from 'pages/data-sheet/components/table-section/node/utils';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { Col, Form, Row, Skeleton, UploadFile } from 'antd';
import { NodeViewTitle } from './node-view-title';
import * as React from 'react';
import { AddNodeForm } from 'components/form/add-node-form';
import { NodeDataConnectionToSave, ProjectTypePropertyReturnData, UserProjectRole } from 'api/types';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { useGetNode } from 'api/node/use-get-node';
import {
  NodeBody,
  NodeDataResponse,
  NodeDataSubmit,
  NodePropertiesValues,
  ResponseLocationType,
  UpdateNodeEdges,
  UploadedFileType,
} from 'types/node';
import { PropertyTypes } from 'components/form/property/types';
import dayjs from 'dayjs';
import { Button } from 'components/button';
import { getConnectionFormName } from 'components/form/type/connection-type';
import { useManageNodesGraph } from 'api/visualisation/use-manage-node';
import { useCallback, useEffect, useMemo } from 'react';
import { setUploadFileStructure } from 'pages/data-sheet/utils';
import { ViewNode } from './node-view';
import { useProject } from 'context/project-context';
import { addEdges, updateConnector } from 'components/layouts/components/visualisation/helpers/utils';
export type VIewDataType = NodeDataResponse | undefined;

const getValue = (item: NodePropertiesValues) => {
  switch (item.project_type_property_type) {
    case PropertyTypes.Location:
      return (
        (item.nodes_data as ResponseLocationType[])?.map((addr) => ({
          address: addr.address,
          lat: addr.location.latitude,
          lng: addr.location.longitude,
        })) || []
      );
    case PropertyTypes.DateTime:
    case PropertyTypes.Date:
      return (item.nodes_data || []).map((rec) => dayjs(rec as string));
    case PropertyTypes.IMAGE_URL:
      return (item.nodes_data as string[])?.map((rec, index) => setUploadFileStructure(rec, `Image ${index}`)) || [];
    case PropertyTypes.Document:
      return (item.nodes_data as UploadedFileType[])?.map((rec) => setUploadFileStructure(rec.url, rec.name)) || [];
    default:
      return item.nodes_data || [];
  }
};

export const ViewEditNodeDrawer = () => {
  const [form] = Form.useForm();
  const [selectedView, setSelectedView] = React.useState<VIewDataType>();

  const { graph, openNode, finishOpenNode } = useGraph() ?? {};
  const { projectInfo } = useProject();

  const [isEdit, setIsEdit] = React.useState(false);

  const setFormValue = useCallback(
    (data: NodeDataResponse | undefined) => {
      const initialAcc = {
        name: [data?.name],
        node_icon: [setUploadFileStructure(data?.default_image ?? '', 'Default image')],
      };

      const fieldsData = data?.properties?.reduce((acc, item) => {
        if (!item.nodes_data?.length) {
          return acc;
        }

        return {
          ...acc,
          [item.nodeTypeProperty.name]: getValue(item),
        } as NodePropertiesValues;
      }, initialAcc);
      const groupList = groupedData(data?.edges ?? []);

      const connectionFieldsData = Object.entries(groupList).reduce((acc, [key, item]) => {
        return {
          ...acc,
          [key]: item.map((row) => ({
            rowId: row.id,
            id: row.edgeTypes.id,
            name: row.nodes.name,
            target_id: row.target_id,
            target_type_id: row.target_type_id,
          })),
        };
      }, {});

      form.setFieldsValue({
        ...fieldsData,
        name: [data?.name],
        node_icon: [setUploadFileStructure(data?.default_image ?? '', 'Default image')],
        ...connectionFieldsData,
      });
    },
    [form]
  );

  const { data: nodeData } = useGetNode(openNode?.id ?? '', {
    enabled: !!openNode?.id,
    onSuccess: (data) => {
      setFormValue(data);
      setSelectedView(data);
    },
  });

  const { isInitialLoading, data: properties } = useGetProjectNodeTypeProperties(nodeData?.project_type_id, {
    enabled: !!nodeData?.project_type_id,
  });

  const { mutate } = useManageNodesGraph({
    onSuccess: ({ data, variables }) => {
      const { nodeId } = variables;
      if (graph.getNodes().find((n) => n.getID() === nodeId)) {
        const { destroyedEdges, createdEdges } = data as UpdateNodeEdges;

        updateNode(variables);

        destroyedEdges?.forEach((e) => graph.removeItem(e.id));

        addEdges(graph, nodeId ?? '', createdEdges);

        updateConnector(graph);
      }
    },
  });

  const updateNode = useCallback(
    (variable: NodeDataSubmit) => {
      graph.updateItem(variable.nodeId ?? '', {
        label: variable.name,
        type: variable.default_image ? 'image' : 'circle',
        img: variable.default_image,
        style: {
          fill: variable.default_image ? '#00000000' : 'white',
        },
        edgeCount: variable.edges?.length,
      });
    },
    [graph]
  );

  const onClose = useCallback(() => {
    setIsEdit(false);
    finishOpenNode();
  }, [finishOpenNode]);

  const onFinish = useCallback(
    (values: NodeBody) => {
      const mainData = {
        name: (values.name as string[]).join(''),
        default_image:
          values.node_icon && (values.node_icon as [])?.length > 0
            ? (values.node_icon as UploadFile[])[0].response.data.uploadPath
            : '',
      };

      const dataToSubmit = nodeData?.properties
        ?.map((item) => {
          return item.project_type_property_type !== PropertyTypes.Connection
            ? {
                id: item.id,
                project_type_property_id: item.project_type_property_id,
                project_type_property_type: item.project_type_property_type,
                nodes_data: setNodeDataUpdateValue(item, values),
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

      if (nodeData?.id) {
        mutate({
          ...mainData,
          nodes: dataToSubmit,
          edges: dataToSubmitEdges?.flat() || [],
          project_type_id: nodeData?.project_type_id || '',
          nodeId: nodeData.id,
        } as NodeDataSubmit);
        onClose();
      }
    },
    [mutate, nodeData, onClose, properties]
  );

  const footer = useMemo(
    () =>
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
      ),
    [isEdit, form]
  );

  const canEdit = projectInfo?.role === UserProjectRole.Owner || projectInfo?.role === UserProjectRole.Editor;

  useEffect(() => {
    setFormValue(nodeData);
    return () => form.resetFields();
  }, [form, nodeData, setFormValue]);

  return (
    <Drawer
      headerStyle={{
        borderTop: `6px solid ${nodeData?.nodeType?.color}`,
      }}
      closable={false}
      onClose={onClose}
      title={
        <NodeViewTitle
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          id={nodeData?.id as string}
          name={nodeData?.name ?? ''}
          onClose={onClose}
          canEdit={canEdit}
        />
      }
      footer={footer}
      open={openNode?.isOpened}
    >
      {isEdit ? (
        <Form
          form={form}
          name="node-edit-form"
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
        >
          <AddNodeForm
            nodeId={openNode?.id}
            data={properties as ProjectTypePropertyReturnData[]}
            isInitialLoading={isInitialLoading}
            edges={nodeData?.edges}
          />
        </Form>
      ) : isInitialLoading ? (
        <Skeleton />
      ) : (
        <ViewNode selectedView={selectedView} properties={nodeData?.properties} />
      )}
    </Drawer>
  );
};
