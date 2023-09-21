import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { groupedData, setNodeDataUpdateValue } from '../../../../../data-sheet/components/table-section/node/utils';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { Col, Form, Row, Skeleton, UploadFile } from 'antd';
import { NodeViewTitle } from './node-view-title';
import * as React from 'react';
import { AddNodeForm } from 'components/form/add-node-form';
import { NodeDataConnectionToSave, ProjectTypePropertyReturnData, UserProjectRole } from 'api/types';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { useGetNode } from 'api/node/use-get-node';
import { NodeBody, NodeDataSubmit, NodePropertiesValues, ResponseLocationType, UploadedFileType } from 'types/node';
import { PropertyTypes } from 'components/form/property/types';
import { Location } from 'components/modal/types';
import dayjs from 'dayjs';
import { Button } from 'components/button';
import { getConnectionFormName } from 'components/form/type/connection-type';
import { useManageNodesGraph } from 'api/visualisation/use-manage-node';
import { useCallback, useMemo } from 'react';
import { setUploadFileStructure } from 'pages/data-sheet/utils';
import { ViewNode } from './node-view';
import { useProject } from 'context/project-context';

const getValue = (item: NodePropertiesValues) => {
  switch (item.project_type_property_type) {
    case PropertyTypes.Location:
      return (item.nodes_data as ResponseLocationType[])?.map(
        (addr: ResponseLocationType) =>
          ({
            address: addr.address,
            lat: addr.location.latitude,
            lng: addr.location.longitude,
          } as Location)
      );
    case PropertyTypes.DateTime:
    case PropertyTypes.Date:
      return item.nodes_data?.map((rec) => dayjs(rec as string));
    case PropertyTypes.IMAGE_URL:
      return (item.nodes_data as string[])?.map((rec, index) => setUploadFileStructure(rec, `Image ${index}`));
    case PropertyTypes.Document:
      return (item.nodes_data as UploadedFileType[])?.map((rec) => setUploadFileStructure(rec.url, rec.name));
    default:
      return item.nodes_data;
  }
};

export const ViewEditNodeDrawer = () => {
  const [form] = Form.useForm();

  const { graph, openNode, finishOpenNode } = useGraph() ?? {};
  const { projectInfo } = useProject();

  const [isEdit, setIsEdit] = React.useState(false);

  const node = graph?.getNodes().find((n) => n?.getID && n?.getID() === openNode?.id);

  const { data: nodeData } = useGetNode(node?.getID() ?? '', {
    enabled: !!node?.getID(),
    onSuccess: (nodeData) => {
      const initialAcc = {
        name: [nodeData.name],
        node_icon: [setUploadFileStructure(nodeData.default_image, 'Default image')],
      };

      const fieldsData = nodeData.properties?.reduce((acc, item) => {
        if (!item.nodes_data?.length) {
          return acc;
        }

        return {
          ...acc,
          [item.nodeTypeProperty.name]: getValue(item),
        } as NodePropertiesValues;
      }, initialAcc);
      const groupList = groupedData(nodeData.edges);

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
        name: [nodeData.name],
        node_icon: [setUploadFileStructure(nodeData.default_image, 'Default image')],
        ...connectionFieldsData,
      });
    },
  });

  const { isInitialLoading, data: properties } = useGetProjectNodeTypeProperties(node?.getModel()?.nodeType as string, {
    enabled: !!node?.getModel()?.nodeType,
  });

  const { mutate } = useManageNodesGraph({
    onSuccess: ({ data, variables }) => {
      updateEdges(data, variables);
      updateNode();
    },
  });

  const updateEdges = useCallback(
    (data: NodePropertiesValues, variables: NodeDataSubmit) => {
      /* Update deleted edges  */
      const deleteEdges = nodeData?.edges.filter(
        (edges1) => !variables?.edges?.some((edges2) => edges1.id === edges2.id)
      );

      deleteEdges?.forEach((e) => graph.removeItem(e.id));

      /* Update created edges  */
      const createEdges = variables?.edges?.filter((edges1) =>
        nodeData?.edges.some((edges2) => edges1.id === edges2.id)
      );
      createEdges?.forEach((edge) => {
        const type = properties?.find((p) => p.id === edge.project_edge_type_id);
        graph.addItem('edge', {
          id: edge.id,
          label: type?.name,
          source: data.id,
          target: edge.target_id,
          project_edge_type_id: edge.project_edge_type_id,
        });
      });
    },
    [graph, nodeData?.edges, properties]
  );

  const updateNode = useCallback(() => {
    const name = form.getFieldValue('name')[0];
    const img = form.getFieldValue('node_icon')[0]?.response?.data?.uploadPath;

    graph.updateItem(openNode?.id ?? '', {
      label: name,
      type: img ? 'image' : 'circle',
      img,
      style: {
        fill: img ? '#00000000' : 'white',
      },
    });
  }, [form, graph, openNode]);

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
          project_type_id: node?.getModel()?.nodeType || '',
          nodeId: nodeData.id,
        } as NodeDataSubmit);
        onClose();
      }
    },
    [mutate, node, nodeData, onClose, properties]
  );

  const footer = useMemo(
    () =>
      isEdit && (
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
      ),
    [isEdit, onClose, form]
  );

  const canEdit = projectInfo?.role === UserProjectRole.Owner || projectInfo?.role === UserProjectRole.Editor;

  return (
    <Drawer
      headerStyle={{
        borderTop: `6px solid ${node?.getModel()?.style?.stroke}`,
      }}
      closable={false}
      onClose={onClose}
      title={
        <NodeViewTitle
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          id={nodeData?.id as string}
          name={(node?.getModel().nodeTypeName as string) ?? ''}
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
          <AddNodeForm data={properties as ProjectTypePropertyReturnData[]} isInitialLoading={isInitialLoading} />
        </Form>
      ) : isInitialLoading ? (
        <Skeleton />
      ) : (
        <ViewNode formFata={form} properties={nodeData?.properties} />
      )}
    </Drawer>
  );
};
