import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { GET_PROJECT_NODE_TYPES_LIST } from './use-get-project-note-types';

const URL_PROJECT_NODE_TYPES_DELETE = '/projects-node-types/delete/:id'

export const useDeleteProjectNodeType = (nodeTypeId = '', options: UseQueryOptions) => {
  const params = useParams()
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: () => client.delete(URL_PROJECT_NODE_TYPES_DELETE.replace(':id', nodeTypeId)), onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries([GET_PROJECT_NODE_TYPES_LIST.replace(':project_id', params.id || '')]);
        options?.onSuccess?.(data);
      } });
  return mutation;
};
