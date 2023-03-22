import { useQuery } from '@tanstack/react-query';
import { GetProjectsParameters } from 'api/types';
import client from '../client';

export const GET_FOLDERS_LIST = '/folders';

export const useGetFolders = (params?: GetProjectsParameters, options = { enabled: true }) => {
  const result = useQuery([GET_FOLDERS_LIST, params], () => client.get(GET_FOLDERS_LIST), {
    ...options,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  };
};
