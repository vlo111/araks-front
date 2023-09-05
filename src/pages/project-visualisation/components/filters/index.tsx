import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_PROJECT_NODE_TYPES_LIST, useGetProjectNoteTypes } from 'api/project-node-types/use-get-project-note-types';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { SiderCollapse } from 'components/collapse/sider-collapse';
import { NodeTypesView } from '../../../data-sheet/components/node-types-view';
import { NodesHeader } from '../../../data-sheet/components/nodes-header';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { IEdge, INode } from '@antv/g6';
export const Filters = () => {
  const params = useParams();
  const [searchVisible, setSearchVisible] = useState(false);
  const { graph } = useGraph();
  const { formatted: nodesList } = useGetProjectNoteTypes(
    {
      url: GET_PROJECT_NODE_TYPES_LIST,
      projectId: params.id || '',
    },
    {
      enabled: !!params.id,
      onSuccess: (data) => {
        /** This condition sets selected fisr node type when first time enter to this page */
        /** WONT work wor all type as the data already exists */
        createNodesTree(data.data, true);
      },
    },
    true
  );

  const onCheck = useCallback(
    (checkedKeys: string[]) => {
      const selectedNodeTypes = new Set(checkedKeys);

      graph.getEdges()?.forEach((edge: IEdge) => {
        graph.updateItem(edge, {
          visible: false,
        });
      });

      graph.getNodes()?.forEach((node: INode) => {
        const nodeType = node.getModel().nodeType;
        if (selectedNodeTypes.size === 0 || selectedNodeTypes.has(nodeType as string)) {
          graph.updateItem(node, {
            visible: true,
            id: node.getModel()?.id ?? '',
            label: node.getModel()?.label ?? '',
            style: {
              stroke: (node.getModel()?.style?.stroke as string) ?? '',
            },
            type: node.getModel().img as string,
            nodeTypeName: node.getModel().nodeTypeName,
          });

          graph.getEdges().forEach((edge: IEdge) => {
            const sourceNodeId = edge.getSource().getID();
            const targetNodeId = edge.getTarget().getID();

            if (sourceNodeId === node.getID() || targetNodeId === node.getID()) {
              graph.updateItem(edge, {
                visible: true,
              });
            }
          });
        } else {
          graph.updateItem(node, {
            visible: false,
          });
        }
      });

      graph.render();
    },
    [graph]
  );

  return (
    <SiderCollapse
      defaultActiveKey="1"
      panels={[
        {
          header: <NodesHeader setSearchVisible={setSearchVisible} />,
          key: '1',
          children: (
            <NodeTypesView
              onCheck={onCheck}
              nodesList={nodesList}
              searchVisible={searchVisible}
              setSearchVisible={setSearchVisible}
              isCheckable={true}
              noColors={true}
            />
          ),
        },
      ]}
    ></SiderCollapse>
  );
};
