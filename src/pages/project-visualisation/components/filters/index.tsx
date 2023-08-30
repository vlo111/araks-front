import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { GET_PROJECT_NODE_TYPES_LIST, useGetProjectNoteTypes } from 'api/project-node-types/use-get-project-note-types';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { SiderCollapse } from 'components/collapse/sider-collapse';
import { formattedData } from 'components/layouts/components/visualisation/helpers/format-node';
import { NodeTypesView } from '../../../data-sheet/components/node-types-view';
import { NodesHeader } from '../../../data-sheet/components/nodes-header';

export const Filters = () => {
  const params = useParams();
  const { graph, nodes, edges } = useGraph() || {};
  const [searchVisible, setSearchVisible] = useState(false);

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
      const filteredNodes = nodes?.filter((node) => checkedKeys.includes(node.nodeType.id));
      const renderAllNodes = filteredNodes?.length ? filteredNodes : nodes;
      const formattedNodes = formattedData(graph, renderAllNodes, edges);
      graph.data(formattedNodes);
      graph.render();
    },
    [graph, nodes, edges]
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
