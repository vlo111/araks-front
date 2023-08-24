import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { URL_COMMENTS_LIST, URL_COMMENT_DELETE } from './constants';

export const useDeleteComment = (id: string, baseUrl = URL_COMMENT_DELETE, options?: UseQueryOptions) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => client.delete(baseUrl.replace(':id', id)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_COMMENTS_LIST.replace(':project_id', params.id as string)]);
      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
