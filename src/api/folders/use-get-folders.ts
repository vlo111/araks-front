
import { GetProjectsParameters } from 'api/types';
import { useQuery } from 'react-query';
import client from '../client';

export const GET_FOLDERS_LIST = '/folders';

const useGetFolders = (params?: GetProjectsParameters, options = { enabled: true }) => {
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

export default useGetFolders;
