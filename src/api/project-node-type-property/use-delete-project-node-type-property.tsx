import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';

import client from '../client';
import { GET_PROJECT_NODE_TYPE_PROPERTIES_LIST } from './use-get-project-node-type-properties';

const URL_PROJECT_NODE_TYPE_PROPERTY_DELETE = '/node-type-property/delete/:id';

export const useDeleteProjectNodeTypeProperty = (
  nodeTypePropertyId: string,
  nodeTypeId: string,
  options?: UseQueryOptions
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => client.delete(URL_PROJECT_NODE_TYPE_PROPERTY_DELETE.replace(':id', nodeTypePropertyId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_PROJECT_NODE_TYPE_PROPERTIES_LIST.replace(':node_type_id', nodeTypeId)]);
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
