import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { URL_COMMENTS_LIST } from './constants';

export const useGetComments = (projectId?: string, options = { enabled: true }) => {
  const url = URL_COMMENTS_LIST.replace(':project_id', projectId as string);
  const result = useQuery({
    queryKey: [url],
    queryFn: () => client.get(url),
    ...options,
    // select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  };
};
