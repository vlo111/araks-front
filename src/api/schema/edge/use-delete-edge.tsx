import { useMutation, UseQueryOptions } from '@tanstack/react-query';

import client from '../../client';

const URL_PROJECT_NODE_TYPES_DELETE = '/projects-edge-type/delete/:id';

export const useDeleteEdge = (options: UseQueryOptions) => {
  const mutation = useMutation({
    mutationFn: (edgeTypeId: string) => client.delete(URL_PROJECT_NODE_TYPES_DELETE.replace(':id', edgeTypeId)),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
