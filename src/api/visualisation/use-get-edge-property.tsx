import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { EdgesProperties } from 'types/edges';

export const GET_EDGES = '/edges/:id';

type GetProjectParam = {
  id?: string;
};

type QueryKey = Omit<GetProjectParam, 'url'> | string;

type ReturnData = {
  data: EdgesProperties | undefined;
  isInitialLoading: boolean;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;

export const useGetEdgeProperties = (id: string, options: Options = { enabled: true }): ReturnData => {
  const urlEdges = GET_EDGES.replace(':id', id || '');
  const result = useQuery({
    queryKey: [urlEdges],
    queryFn: () => client.get(urlEdges),
    ...options,
    onError: errorMessage,
  });
  const { data, isInitialLoading } = result;

  return { isInitialLoading, data: data?.data };
};
