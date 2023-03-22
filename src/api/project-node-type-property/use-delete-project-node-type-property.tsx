import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';
import { GET_PROJECT_NODE_TYPE_PROPERTIES_LIST } from './use-get-project-note-type-properties';

const URL_PROJECT_NODE_TYPE_PROPERTY_DELETE = '/node-type-property/delete/:id';

export const useDeleteProjectNodeTypeProperty = (nodeTypePropertyId = '', options: UseQueryOptions) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => client.delete(URL_PROJECT_NODE_TYPE_PROPERTY_DELETE.replace(':id', nodeTypePropertyId)),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries([GET_PROJECT_NODE_TYPE_PROPERTIES_LIST.replace(':node_type_id', data.data.id)]);
        options?.onSuccess?.(data);
      },
    }
  );
  return mutation;
};
