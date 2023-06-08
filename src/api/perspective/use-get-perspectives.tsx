import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';
import { IResponsePerspectiveData } from "../types";

export const GET_PERSPECTIVES_DATA = '/perspectives/list/:project_id';

type GetProjectParam = {
  id?: string;
};

type QueryKey = GetProjectParam | string;

type ReturnData = {
  data: IResponsePerspectiveData[];
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;
type Result = UseQueryResult<IResponsePerspectiveData[]>;

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
