import { ProjectReturnData } from 'api/types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const GET_PROJECT_DATA = '/projects/:id';

type GetProjectParam = {
  id?: string;
}

type QueryKey = GetProjectParam | string;

type ReturnData = {
  data: ProjectReturnData;
}

type QueryResponse = {
  data: ReturnData
}

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;
type Result = UseQueryResult<ProjectReturnData>;

const useGetProject = (params: GetProjectParam, options: Options = { enabled: true }): Result => {
  const url = GET_PROJECT_DATA.replace(':id', params?.id || '');
  const result = useQuery([url, params], () => client.get(url, { params }), {
    ...options,
    select: (data): ReturnData => data.data
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : {} as ProjectReturnData,
  } as Result;
};

export default useGetProject;
