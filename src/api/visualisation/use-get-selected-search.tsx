import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';
import { Edges, Nodes } from './use-get-data';

type ProjectResponse = {
  nodes: Nodes;
  edges: Edges;
  count: number;
};

export const GET_SEARCH_DATA = '/neo4j/type-or-node/:project_id';

type GetProjectParam = {
  id?: string;
  projectId: string;
};

type QueryKey = Omit<GetProjectParam, 'url'> | string;

export type GetNeo4jData = {
  data: ProjectResponse;
};

type QueryResponse = {
  data: GetNeo4jData;
};

type Options = UseQueryOptions<QueryResponse, Error, GetNeo4jData, QueryKey[]>;

export const useGetSelectedSearchData = (options: Options) => {
  const params = useParams();

  const urlNodes = GET_SEARCH_DATA.replace(':project_id', params?.id || '');

  return useMutation({
    mutationFn: (params: { id: string; action: string }) => client.get(urlNodes, { params }),
    onSuccess: (data) => options?.onSuccess?.(data),
    onError: errorMessage,
  });
};
