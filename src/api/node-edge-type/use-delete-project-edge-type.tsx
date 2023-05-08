import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { GET_PROJECT_NODE_TYPES_LIST } from 'api/project-node-types/use-get-project-note-types';
import { useParams } from 'react-router-dom';

import client from '../client';
import { URL_GET_NODE_EDGE_TYPES_LIST } from './use-get-node-edge-types';

const URL_PROJECT_EDGE_TYPE_DELETE = '/projects-edge-type/delete/:id';

export const useDeleteProjectEdgeType = (edgeTypePropertyId: string, nodeTypeId: string, options?: UseQueryOptions) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const mutation = useMutation({
    mutationFn: () => client.delete(URL_PROJECT_EDGE_TYPE_DELETE.replace(':id', edgeTypePropertyId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_GET_NODE_EDGE_TYPES_LIST.replace(':project_id', params.id || '')]);
      queryClient.invalidateQueries([GET_PROJECT_NODE_TYPES_LIST.replace(':project_id', params.id || '')]);

      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
