import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../../client';
import { GET_TYPES } from './use-get-types';

const URL_PROJECT_NODE_TYPES_DELETE = '/projects-node-types/delete/:id';

export const useDeleteType = (options: UseQueryOptions) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (nodeTypeId: string) => client.delete(URL_PROJECT_NODE_TYPES_DELETE.replace(':id', nodeTypeId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_TYPES.replace(':project_id', params.id || '')]);

      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
