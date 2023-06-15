import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from '../../client';
import { IResponsePerspectiveUsers, ISharedPerspectiveUserData } from '../../types';

type GetProjectParam = {
  id?: string;
};

type QueryKey = GetProjectParam | string;

type ReturnData = {
  data: IResponsePerspectiveUsers;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;

type Result = { shared: ISharedPerspectiveUserData[] };

export const GET_PERSPECTIVES_USERS = '/perspectives/:perspectiveId';

export const useGetPerspectiveUsers = (params: GetProjectParam, options: Options = { enabled: true }): Result => {
  const url = GET_PERSPECTIVES_USERS.replace(':perspectiveId', params?.id || '');
  const result = useQuery({
    queryKey: [url, params],
    queryFn: () => client.get(url, { params }),
    ...options,
  });
  const { data, isSuccess } = result;

  return { shared: isSuccess ? data?.data.shared : ([] as ISharedPerspectiveUserData[]) };
};
