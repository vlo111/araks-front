
import { GetProjectsParameters } from 'api/types';
import { useQuery } from 'react-query';
import client from '../client';

export const GET_PROJECTS_LIST = '/projects';

const useGetProjects = (params: GetProjectsParameters, options = { enabled: true }) => {
  const result = useQuery([GET_PROJECTS_LIST, params], () => client.get(GET_PROJECTS_LIST), {
    ...options,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  };
};

export default useGetProjects;
