import { ProjectCommentManage, RequestTypes } from 'api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { errorMessage } from 'helpers/utils';
import { URL_COMMENTS_NODES_LIST, URL_COMMENT_NODES_COUNT, URL_COMMENT_NODES_CREATE } from './constants';

export const useManageNodeComment = (nodeId?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: ProjectCommentManage) => {
      return client[RequestTypes.Post](URL_COMMENT_NODES_CREATE, values);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_COMMENTS_NODES_LIST.replace(':node_id', nodeId || '')]);
      queryClient.invalidateQueries([URL_COMMENT_NODES_COUNT.replace(':id', nodeId || '')]);
    },
    onError: errorMessage,
  });
  return mutation;
};
