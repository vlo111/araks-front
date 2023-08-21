import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CommentData, CommentsResponse, LikesResponse } from 'api/types';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';
import client from '../client';
import { URL_FAVORIES_LIST } from './constants';

type LikesReturnType = {
  data: LikesResponse;
};

export const useGetFavorites = (options?: UseQueryOptions<LikesReturnType, Error, LikesResponse>) => {
  const params = useParams();
  const url = URL_FAVORIES_LIST.replace(':project_id', params.id as string);
  const result = useQuery<LikesReturnType, Error, LikesResponse>({
    queryKey: [url],
    queryFn: () => client.get(url),
    enabled: !!params.id,
    select: (data) => data.data,
    onError: errorMessage,
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: (isSuccess ? data : {}) as CommentsResponse,
    rowsData: (isSuccess ? data.rows : []) as CommentData[],
    count: (isSuccess ? data.count : 0) as number,
  };
};
