import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Col, Form, Row, TreeSelect, UploadFile } from 'antd';
import { useParams } from 'react-router-dom';
import { Drawer } from 'components/drawer/node-drawer/view-node-drawer';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { AddNodeForm } from 'components/form/add-node-form';
import { useManageNodesGraph } from 'api/visualisation/use-manage-node';
import { Button } from 'components/button';
import { getConnectionFormName } from 'components/form/type/connection-type';
import { NodeDataConnectionToSave, ProjectTypePropertyReturnData } from 'api/types';
import { useGetTypes } from 'api/schema/type/use-get-types';
import { NodeBody, NodeDataSubmit, NodePropertiesValues } from 'types/node';
import { PropertyTypes } from 'components/form/property/types';
import { setNodeDataValue } from 'pages/data-sheet/components/table-section/node/utils';
import { addEdges, updateConnector } from 'components/layouts/components/visualisation/helpers/utils';
import './add-node-select.css';
import { nodeLabelCfgStyle } from 'components/layouts/components/visualisation/helpers/constants';
import { TreeNodeType } from '../../../../data-sheet/types';
import debounce from 'lodash.debounce';
import { filterTreeData } from '../../../../data-sheet/utils';

export const NodeCreateDrawer: React.FC = () => {
  const [form] = Form.useForm();
  const { graph, openNodeCreate, finishOpenNodeCreate, graphInfo, setGraphInfo } = useGraph() ?? {};
  const { id } = useParams();

  const parent_id = Form.useWatch('parent_id', { form, preserve: true });

  const { isInitialLoading, data: properties } = useGetProjectNodeTypeProperties(parent_id, {
    enabled: !!parent_id,
    onSuccess: () => {
      form.resetFields();
      form.setFieldValue('parent_id', parent_id);
    },
  });

  const { nodes } = useGetTypes({ projectId: id ?? '' });

  const [filteredData, setFilteredData] = useState<TreeNodeType[]>([]);

  useEffect(() => {
    if (nodes && nodes.length) {
      setFilteredData(createNodesTree(nodes ?? []));
    } else {
      setFilteredData([]);
    }
  }, [nodes]);

  const onSearch = useCallback(
    (value: string) => {
      const searchText = value.trim().toLowerCase();

      debounce(() => {
        const filteredData = filterTreeData(createNodesTree(nodes ?? []), searchText);
        setFilteredData(filteredData);
      }, 500)();
    },
    [nodes]
  );

  const createNode = useCallback(
    (data: NodePropertiesValues, edgeCount: number) => {
      const nodeData = data as NodePropertiesValues & {
        nodeType: { color: string; id: string; name: string };
        default_image: string;
      };

      const node = {
        id: nodeData.id,
        label: nodeData.name as unknown as string,
        img: `${process.env.REACT_APP_AWS_URL}${nodeData.default_image}`,
        type: nodeData.default_image ? 'image' : 'circle',
        x: openNodeCreate.x,
        y: openNodeCreate.y,
        nodeType: nodeData.nodeType.id,
        nodeTypeName: nodeData.nodeType.name,
        edgeCount,
        style: {
          stroke: nodeData.nodeType?.color ?? '',
        },
        labelCfg: nodeLabelCfgStyle,
      };

      graph.addItem('node', {
        ...node,
        labelCfg: nodeLabelCfgStyle,
      });
    },
    [graph, openNodeCreate]
  );

  const { mutate, isLoading } = useManageNodesGraph({
    onSuccess: ({ data }) => {
      const nodePropertyValues = data as NodePropertiesValues;

      const edgeCount = nodePropertyValues.createdEdges?.length ?? 0;

      createNode(nodePropertyValues, edgeCount);

      const { id, createdEdges = [] } = nodePropertyValues;

      addEdges(graph, id, createdEdges);

      updateConnector(graph);

      form.resetFields();

      setGraphInfo({
        nodeCount: (graphInfo?.nodeCount ?? 0) + 1,
        nodeCountAPI: (graphInfo?.nodeCountAPI ?? 0) + 1,
      });

      finishOpenNodeCreate();
      setFilteredData(createNodesTree(nodes ?? []));
    },
  });

  const onFinish = useCallback(
    (values: NodeBody) => {
      const mainData = { name: '', default_image: '' };
      const dataToSubmit = properties
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
      const dataToSubmitEdges = properties
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
        project_type_id: parent_id || '',
      } as NodeDataSubmit);
    },
    [properties, mutate, parent_id]
  );

  const treeSelect = useMemo(
    () => (
      <>
        <Form.Item name="parent_id" style={{ margin: 0, padding: '0 5px' }}>
          <TreeSelect
            showSearch
            onSearch={onSearch}
            className={'node-type-select'}
            popupClassName={'node-type-popup-select'}
            treeData={filteredData}
            style={{ width: '100%' }}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto',
              minWidth: '24rem',
              padding: '1rem 0',
            }}
            allowClear
            onClear={() => {
              setFilteredData(createNodesTree(nodes ?? []));
            }}
            rootClassName="node-type-select-dropdown"
            placeholder="Select Type"
            treeDefaultExpandAll
            fieldNames={{ value: 'key' }}
          ></TreeSelect>
        </Form.Item>
      </>
    ),
    [filteredData, nodes, onSearch]
  );
  const footer = useMemo(
    () =>
      parent_id && (
        <Row gutter={16} justify="center">
          <Col span={4}>
            <Button
              style={{ marginRight: 8 }}
              onClick={() => {
                setFilteredData(createNodesTree(nodes ?? []));
                finishOpenNodeCreate();
              }}
              block
            >
              Cancel
            </Button>
          </Col>
          <Col span={4}>
            <Button type="primary" disabled={isLoading} loading={isLoading} onClick={() => form.submit()} block>
              Save
            </Button>
          </Col>
        </Row>
      ),
    [parent_id, isLoading, nodes, finishOpenNodeCreate, form]
  );

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
          padding: '14px 24px 14px 0',
        }}
        onClose={finishOpenNodeCreate}
        closable={false}
        title={treeSelect}
        footer={footer}
        open={openNodeCreate?.isOpened}
      >
        <AddNodeForm
          data={properties as ProjectTypePropertyReturnData[]}
          isInitialLoading={isInitialLoading}
          nodeTypeId={parent_id}
        />
      </Drawer>
    </Form>
  );
};
