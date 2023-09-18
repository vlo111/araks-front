import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from '../../client';
import { useParams } from 'react-router-dom';

type RequestData = {
  page: number;
  size: number;
  search: string;
};

type ReturnPerspectiveTypeData = {
  count: number;
  rows: {
    id: string;
    role: string;
    status: string;
    user_id: string;
    perspective_user_id: string;
    perspective_id: string;
    project_id: string;
    created_at: string;
    updated_at: string;
    perspective_users: {
      avatar: string;
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      username: string;
    };
    perspectives: {
      id: string;
      title: string;
    }[];
  }[];
};

type QueryKey = RequestData | string;

type ReturnData = {
  data: ReturnPerspectiveTypeData;
  isLoading: boolean;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;

export const USE_GET_ALL_MEMBERS = '/perspectives/all-members/:project_id';

export const useGetAllMembers = (params: RequestData, options: Options = { enabled: true }): ReturnData => {
  const { id } = useParams();

  const url = USE_GET_ALL_MEMBERS.replace(':project_id', id || '');
  const result = useQuery({
    queryKey: [url, params],
    queryFn: () => client.post(url, { ...params }),
    ...options,
  });

  const { data, isSuccess, isLoading } = result;

  return { isLoading, data: isSuccess ? data?.data : ({} as ReturnPerspectiveTypeData) };
};
