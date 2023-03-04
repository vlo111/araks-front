
import { useQuery } from 'react-query';
import client from '../client';

export const GET_PROJECT_DATA = '/projects/info/:id';

type GetProjectParam = {
  id?: string;
}

const useGetProject = (params: GetProjectParam, options = { enabled: true }) => {
  const url = GET_PROJECT_DATA.replace(':id', params?.id || '');
  const result = useQuery([url, params], () => client.get(url, { params }), {
    ...options,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  };
};

export default useGetProject;
