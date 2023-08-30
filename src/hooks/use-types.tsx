/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { useGetTypes } from 'api/schema/type/use-get-types';
import { initNodes } from 'components/layouts/components/schema/container/initial/nodes';
import { formattedTypes } from 'components/layouts/components/schema/helpers/format-type';
import { IProjectType } from '../api/types';
import { useGetEdges } from '../api/schema/edge/use-get-edges';
import { useEffect, useRef } from 'react';
import { useProject } from '../context/project-context';

export const useTypes: () => { isInitialLoading: boolean; nodes: IProjectType[] } = () => {
  const { id } = useParams();
  const { graph, ...params } = useSchema() ?? {};
  const isInitialMount = useRef(true);
  const { projectInfo } = useProject();

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
    if (nodes !== undefined && graph !== undefined && edges !== undefined) {
      initNodes(graph, formattedTypes(graph, nodes, edges, projectInfo), params);

      if (isInitialMount.current && graph.zoomToFit !== undefined) {
        isInitialMount.current = false;
        graph.zoomToFit({ padding: 10, maxScale: 3 });
      }
    }
  }, [graph, nodes, edges]);

  return { nodes, isInitialLoading };
};
