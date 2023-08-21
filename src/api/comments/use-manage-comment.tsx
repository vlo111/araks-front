import { ProjectCommentManage, RequestType, RequestTypes } from 'api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { errorMessage } from 'helpers/utils';
import { URL_COMMENTS_LIST, URL_COMMENT_CREATE } from './constants';
import { useParams } from 'react-router-dom';

export const useManageComment = (url = URL_COMMENT_CREATE, type: RequestType = RequestTypes.Post) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: ProjectCommentManage) => {
      return client[type](url, values);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_COMMENTS_LIST.replace(':project_id', params.id as string)]);
    },
    onError: errorMessage,
  });
  return mutation;
};
