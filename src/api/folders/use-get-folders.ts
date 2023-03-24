import { GetProjectsParameters } from 'api/types';
import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const GET_FOLDERS_LIST = '/folders';

export const useGetFolders = (params?: GetProjectsParameters, options = { enabled: true }) => {
  const result = useQuery({ queryKey: [GET_FOLDERS_LIST, params], queryFn: () => client.get(GET_FOLDERS_LIST, { params }), ...options, select: (data) => data.data });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  };
};
