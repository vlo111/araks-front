import { useEffect } from 'react';
import { useGraph } from '../components/layouts/components/visualisation/wrapper';
import { initData } from '../components/layouts/components/visualisation/container/initial/nodes';
import { formattedData } from '../components/layouts/components/visualisation/helpers/format-node';
import { useGetData } from '../api/visualisation/use-get-data';

export const useNodes = () => {
  const { graph, ...params } = useGraph() ?? {};

  const { nodes, edges, isInitialLoading } = useGetData({
    onSuccess: ({
      data: {
        data: { nodes, edges },
      },
    }) => {
      params.setNodes && params.setNodes(nodes);
      params.setEdges && params.setEdges(edges);
    },
  });

  // const { nodes, isInitialLoading } = useGetNodes({
  //   onSuccess: (data) => {
  //     params.setNodes && params.setNodes(data.rows);
  //   },
  // });
  //
  // useGetVEdges({
  //   onSuccess: (edges) => {
  //     params.setEdges && params.setEdges(edges.data);
  //   },
  // });

  useEffect(() => {
    if (nodes !== undefined && graph !== undefined && params.nodes !== undefined && params.edges !== undefined) {
      const data = formattedData(graph, params.nodes, params.edges);

      if (data !== undefined) initData(graph, data);
    }
  }, [graph, params.edges, params.nodes, nodes]);

  return { nodes, edges, isInitialLoading };
};
