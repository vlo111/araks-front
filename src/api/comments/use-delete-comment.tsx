import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { URL_COMMENTS_LIST, URL_COMMENT_DELETE } from './constants';

export const useDeleteComment = (id: string) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => client.delete(URL_COMMENT_DELETE.replace(':id', id)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_COMMENTS_LIST.replace(':project_id', params.id as string)]);
    },
  });
  return mutation;
};
