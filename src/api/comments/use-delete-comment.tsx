import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { URL_COMMENTS_LIST, URL_COMMENT_DELETE } from './constants';

export const useDeleteFolder = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => client.delete(URL_COMMENT_DELETE.replace(':id', id)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_COMMENTS_LIST]);
    },
  });
  return mutation;
};
