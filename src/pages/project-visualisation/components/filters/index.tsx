import { useMemo, useState } from 'react';
import { Skeleton } from 'antd';
import { SiderCollapse } from 'components/collapse/sider-collapse';
import { NodeTypesView } from '../../../data-sheet/components/node-types-view';
import { NodesHeader } from '../../../data-sheet/components/nodes-header';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { useTypes } from 'hooks/use-types';
import { formattedData } from 'components/layouts/components/visualisation/helpers/format-node';
import { useGetData } from 'api/visualisation/use-get-data';
import { useManageFilters } from './use-manage-filters';
import { initData as initGraphData } from 'components/layouts/components/visualisation/container/initial/nodes';

export const Filters = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const { graph } = useGraph() ?? {};
  const { nodes, isInitialLoading } = useTypes();
  const { nodes: nodesList, edges: edgesList } = useGetData();

  const { mutate } = useManageFilters({
    onSuccess: ({ data }) => {
      const { nodes, edges } = formattedData(data.nodes, data.edges);
      const result = { nodes, edges };
      initGraphData(graph, result);
      graph.render();
    },
  });

  const initData = useMemo(() => {
    if (graph !== undefined && nodesList !== undefined && edgesList !== undefined) {
      const { nodes, edges } = formattedData(nodesList, edgesList);
      return { nodes, edges };
    }
    return { nodes: [], edges: [] };
  }, [graph, nodesList, edgesList]);

  const onCheck = async (checkedKeys: string[]) => {
    if (checkedKeys.length) {
      mutate(checkedKeys);
    } else {
      initGraphData(graph, initData);
      graph.render();
    }
  };

  return isInitialLoading ? (
    <Skeleton />
  ) : (
    <SiderCollapse
      defaultActiveKey="1"
      panels={[
        {
          header: <NodesHeader setSearchVisible={setSearchVisible} />,
          key: '1',
          children: (
            <NodeTypesView
              onCheck={onCheck}
              nodesList={createNodesTree(nodes, true)}
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
