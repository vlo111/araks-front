import { useEffect } from 'react';
import { useGraph } from '../components/layouts/components/visualisation/wrapper';
import { initData } from '../components/layouts/components/visualisation/container/initial/nodes';
import { formattedData } from '../components/layouts/components/visualisation/helpers/format-node';
import { AllDataResponse } from '../types/node';
import { useGetVEdges } from '../api/visualisation/use-get-edges';
import { useGetNodes } from '../api/visualisation/use-get-nodes';

export const useNodes: () => { isInitialLoading: boolean; nodes: AllDataResponse[] } = () => {
  const { graph, ...params } = useGraph() ?? {};

  const { nodes, isInitialLoading } = useGetNodes({
    onSuccess: (data) => {
      params.setNodes && params.setNodes(data.rows);
    },
  });

  useGetVEdges({
    onSuccess: (edges) => {
      params.setEdges && params.setEdges(edges.data);
    },
  });

  useEffect(() => {
    if (nodes !== undefined && graph !== undefined && params.nodes !== undefined && params.edges !== undefined) {
      const data = formattedData(graph, params.nodes, params.edges);

      if (data !== undefined) initData(graph, data);
    }
  }, [graph, params.edges, params.nodes, nodes]);

  useEffect(() => {
    setTimeout(() => {
      if (graph?.render) graph?.render();
    }, 500);
  }, [graph]);

  return { nodes, isInitialLoading };
};
