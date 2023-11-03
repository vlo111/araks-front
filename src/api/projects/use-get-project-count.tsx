import { useQuery, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const GET_PROJECT_COUNT = '/projects/counts';

export type ProjectCountData = {
  projects: number;
  shared: number;
};

type Result = UseQueryResult<ProjectCountData>;

export const useGetProject = (): Result => {
  const result = useQuery({
    queryKey: [GET_PROJECT_COUNT],
    queryFn: () => client.get(GET_PROJECT_COUNT),
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data.data : ({} as ProjectCountData),
  } as Result;
};
