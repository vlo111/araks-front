import { useQuery } from '@tanstack/react-query';
import { CommentData, CommentsResponse } from 'api/types';
import client from '../client';
import { URL_COMMENTS_NODES_LIST } from './constants';

export const useGetNodeComments = (id: string) => {
  const url = URL_COMMENTS_NODES_LIST.replace(':node_id', id);
  const result = useQuery({
    queryKey: [url],
    queryFn: () => client.get(url),
    enabled: !!id,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: (isSuccess ? data : {}) as CommentsResponse,
    rowsData: (isSuccess ? data.rows : []) as CommentData[],
    count: (isSuccess ? data.count : 0) as number,
  };
};
