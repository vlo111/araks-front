import { useQuery } from '@tanstack/react-query';
import { CommentData, CommentsResponse } from 'api/types';
import { useParams } from 'react-router-dom';
import client from '../client';
import { URL_FAVORIES_LIST } from './constants';

export const useGetComments = () => {
  const params = useParams();
  const url = URL_FAVORIES_LIST.replace(':project_id', params.id as string);
  const result = useQuery({
    queryKey: [url],
    queryFn: () => client.get(url),
    enabled: !!params.id,
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
