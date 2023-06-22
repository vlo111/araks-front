import { useEffect } from 'react';
import { useGraph } from '../components/layouts/components/visualisation/wrapper';
import { initData } from '../components/layouts/components/visualisation/container/initial/nodes';
import { formattedData } from '../components/layouts/components/visualisation/container/helpers/format-node';
import { useGetProjectAllData } from '../api/all-data/use-get-project-all-data';
import { AllDataResponse } from '../types/node';
import { useGetVEdges } from '../api/visualisation/use-get-edges';

export const useNodes: () => { isInitialLoading: boolean; rowsData: AllDataResponse[] } = () => {
  const { graph, ...params } = useGraph() ?? {};

  const { rowsData, isInitialLoading } = useGetProjectAllData(
    { page: 1, size: 100 },
    {
      onSuccess: (data) => {
        const row: unknown =
          data.rows
            .map((a) => a.properties)
            .flat()
            .filter((a) => a?.default_property === true) ?? [];

        if (row !== undefined) {
          params.setNodes(row);
        }
      },
    }
  );

  useGetVEdges({
    onSuccess: (edges) => {
      params.setEdges(edges.data);
    },
  });

  useEffect(() => {
    if (rowsData !== undefined && graph !== undefined && params.nodes !== undefined && params.edges) {
      const data = formattedData(graph, params.nodes, params.edges);
      if (data !== undefined) initData(graph, data);
    }
  }, [graph, params.edges, params.nodes, rowsData]);

  return { rowsData, isInitialLoading };
};
