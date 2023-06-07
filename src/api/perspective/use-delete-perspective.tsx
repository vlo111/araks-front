import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { GET_PERSPECTIVES_DATA } from './use-get-perspectives';

const URL_PERSPECTIVE_DELETE = '/perspectives/delete/:id';

export const useDeletePerspective = (options: UseQueryOptions) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => client.delete(URL_PERSPECTIVE_DELETE.replace(':id', id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries([GET_PERSPECTIVES_DATA.replace(':project_id', params?.id || '')]);
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
