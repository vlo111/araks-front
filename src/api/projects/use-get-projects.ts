import { GetProjectsParameters, ProjectFolderReturnData, ProjectFullInfo } from 'api/types';
import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const GET_PROJECTS_LIST = '/projects';
export const GET_PROJECTS_PUBLIC_LIST = '/projects/public';
export const GET_PROJECTS_SHARED = '/shared';
export const GET_FOLDER_PROJECTS_LIST = '/folders/:id';

type ReturnDataType = {
  count: number;
  rows: ProjectFullInfo[];
};

type ProjectReturnType = {
  data: ReturnDataType;
  folder?: ProjectFolderReturnData;
};

export const useGetProjects = (params: GetProjectsParameters, url = GET_PROJECTS_LIST, options = { enabled: true }) => {
  const result = useQuery<ProjectReturnType>({
    queryKey: [url, params],
    queryFn: () => client.get(url, { params }),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ({} as ProjectReturnType),
  };
};
