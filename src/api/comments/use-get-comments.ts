import { ProjectCommentListParams } from 'api/types';
import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { URL_COMMENTS_LIST } from './constants';

export const useGetComments = (params: ProjectCommentListParams, options = { enabled: true }) => {
  const result = useQuery({
    queryKey: [URL_COMMENTS_LIST, params],
    queryFn: () => client.get(URL_COMMENTS_LIST, { params }),
    ...options,
    // select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  };
};
