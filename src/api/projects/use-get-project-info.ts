import { ProjectFullInfo } from 'api/types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';
import { useIsPublicPage } from 'hooks/use-is-public-page';

export const GET_PROJECT_INFO_DATA = '/projects/info/:id';
export const GET_PUBLIC_PROJECT_INFO_DATA = '/public/info/:id';

type GetProjectParam = {
  id?: string | null;
};

type QueryKey = GetProjectParam | string;

type ReturnData = {
  data: ProjectFullInfo;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;
type Result = UseQueryResult<ProjectFullInfo>;

export const useGetProjectInfo = (params: GetProjectParam, options: Options = { enabled: true }): Result => {
  const isPublicPage = useIsPublicPage();

  const url = (isPublicPage ? GET_PUBLIC_PROJECT_INFO_DATA : GET_PROJECT_INFO_DATA).replace(':id', params?.id || '');
  const result = useQuery({
    queryKey: [url, params],
    queryFn: () => client.get(url, { params }),
    ...options,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : ({} as ProjectFullInfo),
  } as Result;
};
