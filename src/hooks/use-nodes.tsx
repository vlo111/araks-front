import { useParams } from 'react-router-dom';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { useGetTypes } from 'api/schema/type/use-get-types';
import { initNodes } from 'components/layouts/components/schema/container/initial/nodes';
import { formattedTypes } from 'components/layouts/components/schema/helpers/format-type';
import { IProjectType } from '../api/types';
import { useGetEdges } from '../api/schema/edge/use-get-edges';
import { useEffect } from 'react';

export const useNodes: () => { isInitialLoading: boolean; nodes: IProjectType[] } = () => {
  const { id } = useParams();
  const { graph, ...params } = useSchema() ?? {};

  const { nodes, isInitialLoading } = useGetTypes(
    { projectId: id ?? '' },
    {
      onSuccess: ({ data: { projectsNodeTypes } }) => {
        params.setNodes(projectsNodeTypes);
      },
    }
  );

  const { edges } = useGetEdges(
    { projectId: id ?? '' },
    {
      onSuccess: ({ data }) => {
        params.setEdges(data);
      },
    }
  );

  useEffect(() => {
    if (edges !== undefined && nodes !== undefined && graph !== undefined) {
      initNodes(graph, formattedTypes(graph, nodes, edges), params);
    }
  }, [graph, nodes, edges]);

  return { nodes, isInitialLoading };
};
