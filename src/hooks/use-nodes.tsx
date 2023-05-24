import { useParams } from 'react-router-dom';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { GET_TYPES, useGetTypes } from 'api/schema/type/use-get-types';
import { initNodes } from 'components/layouts/components/schema/container/initial/nodes';
import client from 'api/client';
import { formattedTypes } from 'components/layouts/components/schema/helpers/format-type';
import { IProjectType } from '../api/types';

export const useNodes: () => { isInitialLoading: boolean; nodes: IProjectType[] } = () => {
  const { id } = useParams();
  const { graph, ...params } = useSchema() ?? {};

  const { nodes, isInitialLoading } = useGetTypes(
    {
      url: GET_TYPES,
      projectId: id ?? '',
    },
    {
      enabled: !!id,
      onSuccess: async ({ data: { projectsNodeTypes } }) => {
        /** Get edges for format and render with types  */
        const { data: edges } = await client.get(`${process.env.REACT_APP_BASE_URL}projects-edge-type/list/${id}`);

        params.setEdges(edges);
        params.setNodes(projectsNodeTypes);

        initNodes(graph, formattedTypes(graph, projectsNodeTypes, edges), params);
      },
    }
  );

  return { nodes, isInitialLoading };
};
