import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const GET_PERSPECTIVES_DATA = '/perspectives/list/:project_id';

export type ResponsePerspectiveData = {
  description: string;
  id: string;
  project_id: string;
  status: string;
  title: string;
  shared: {
    created_at: string
    id: string
    perspective_id: string
    perspective_user_id: string
    project_id: string
    role: string
    status: string
    updated_at: string
    user_id: string
  }[];
};

type GetProjectParam = {
  id?: string;
};

type QueryKey = GetProjectParam | string;

type ReturnData = {
  data: ResponsePerspectiveData[];
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;
type Result = UseQueryResult<ResponsePerspectiveData[]>;

export const useGetPerspectives = (params: GetProjectParam, options: Options = { enabled: true }): Result => {
  const url = GET_PERSPECTIVES_DATA.replace(':project_id', params?.id || '');
  const result = useQuery({
    queryKey: [url, params],
    queryFn: () => client.get(url, { params }),
    ...options,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  } as Result;
};
