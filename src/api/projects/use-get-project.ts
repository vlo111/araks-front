import { ProjectReturnData } from 'api/types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';
import { useIsPublicPage } from 'hooks/use-is-public-page';

export const GET_PROJECT_DATA = '/projects/:id';
export const GET_PUBLIC_PROJECT_DATA = '/public/:id';

type GetProjectParam = {
  id?: string;
};

type QueryKey = GetProjectParam | string;

type ReturnData = {
  data: ProjectReturnData;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;
type Result = UseQueryResult<ProjectReturnData>;

export const useGetProject = (params: GetProjectParam, options: Options = { enabled: true }): Result => {
  const isPublicPage = useIsPublicPage();

  const url = (isPublicPage ? GET_PUBLIC_PROJECT_DATA : GET_PROJECT_DATA).replace(':id', params?.id || '');
  const result = useQuery({
    queryKey: [url, params],
    queryFn: () => client.get(url, { params }),
    ...options,
    // select: (data): ReturnData => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : ({} as ProjectReturnData),
  } as Result;
};
