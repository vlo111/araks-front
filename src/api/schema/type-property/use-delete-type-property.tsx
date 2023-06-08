import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import client from 'api/client';
import { GET_TYPES } from '../type/use-get-types';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

const URL_PROJECT_NODE_TYPE_PROPERTY_DELETE = '/node-type-property/delete/:id';

export const useDeleteTypeProperty = (nodeTypePropertyId = '', options?: UseQueryOptions) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => client.delete(URL_PROJECT_NODE_TYPE_PROPERTY_DELETE.replace(':id', nodeTypePropertyId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_TYPES.replace(':project_id', params.id || '')]);
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
