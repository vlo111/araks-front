import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';
import client from '../client';
import { GET_SEARCH_GLOBAL_DATA } from './constants';

export type NodeType = {
  id: string;
  title: string;
  color: string;
  node_id: string;
  node_name: string;
  user_id: string;
};

export type TypeProp = {
  id: string;
  title: string;
  color: string;
  node_type_id: string;
  node_type_name: string;
  user_id: string;
};

export type ProjectType = {
  id: string;
  title: string;
  color: string;
  created_at: string;
  privacy: string;
  user_id: string;
  icon: string;
};

type UsersGlobalSearchResponseData = {
  nodes: NodeType[];
  projects: ProjectType[];
  types: TypeProp[];
};

type Options = UseQueryOptions<QueryResponse, Error, QueryResponse>;

type QueryResponse = {
  data: UsersGlobalSearchResponseData;
};

export const useGetUserGlobalSearch = (options: Options = { enabled: false }, search: string): QueryResponse => {
  const urlNodes = GET_SEARCH_GLOBAL_DATA;

  const result = useQuery({
    queryKey: [urlNodes, search],
    queryFn: () => client.get(urlNodes, { params: { search } }),
    ...options,
    onError: errorMessage,
  });

  const { data } = result;

  return { data: data?.data ?? ({} as UsersGlobalSearchResponseData) };
};
