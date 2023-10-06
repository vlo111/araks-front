import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { URL_COMMENT_NODES_COUNT } from './constants';

export const useGetNodeCommentsCount = (nodeId?: string) => {
  const url = URL_COMMENT_NODES_COUNT.replace(':id', nodeId as string);
  const result = useQuery({
    queryKey: [url],
    queryFn: () => client.get(url),
    enabled: !!nodeId,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: (isSuccess ? data : 0) as number,
  };
};
