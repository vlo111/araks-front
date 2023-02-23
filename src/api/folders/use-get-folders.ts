
import { useQuery } from 'react-query';
import client from '../client';

export const GET_FOLDERS_LIST = '/folders';

export type GetFoldersParameters = {
    page?: number,
    size?: number,
    sortField?: string,
    sortOrder?: string
}

const useGetFolders = (params: GetFoldersParameters, options = { enabled: true }) => {
  const result = useQuery([GET_FOLDERS_LIST, params], () => client.get(GET_FOLDERS_LIST, { params }), {
    ...options,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data : [],
  };
};

export default useGetFolders;
