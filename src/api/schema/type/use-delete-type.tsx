import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../../client';
import { GET_TYPES } from './use-get-types';
import { GET_EDGES } from "../edge/use-get-edges";
import { errorMessage } from "helpers/utils";

const URL_PROJECT_NODE_TYPES_DELETE = '/projects-node-types/delete/:id';

export const useDeleteType = (options: UseQueryOptions) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (nodeTypeId: string) => client.delete(URL_PROJECT_NODE_TYPES_DELETE.replace(':id', nodeTypeId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_TYPES.replace(':project_id', params.id || '')]);
      queryClient.invalidateQueries([GET_EDGES.replace(':project_id', params.id || '')]);

      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
