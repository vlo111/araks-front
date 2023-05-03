import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';
import { GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST } from './use-get-projects-edge-type-properties';

const URL_PROJECT_EDGE_TYPE_PROPERTY_DELETE = '/edge-type-property/delete/:id';

export const useDeleteProjectEdgeTypeProperty = (
  nodeTypePropertyId: string,
  nodeTypeId: string,
  options?: UseQueryOptions
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => client.delete(URL_PROJECT_EDGE_TYPE_PROPERTY_DELETE.replace(':id', nodeTypePropertyId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST.replace(':edge_type_id', nodeTypeId)]);
      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
