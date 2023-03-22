import { GetProjectsParameters } from 'api/types';
import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const GET_PROJECTS_LIST = '/projects';
export const GET_PROJECTS_PUBLIC_LIST = '/projects/public';
export const GET_FOLDER_PROJECTS_LIST = '/folders/:id';

export const useGetProjects = (params: GetProjectsParameters, url = GET_PROJECTS_LIST, options = { enabled: true }) => {
  const result = useQuery([url, params], () => client.get(url, { params }), {
    ...options,
    // select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  };
};
