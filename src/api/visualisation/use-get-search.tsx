import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

type Node = {
  id: string;
  _fields: {
    labels: string[];
    properties: {
      [key: string]: never;
    };
  }[];
};

type Edge = {
  _fields: {
    type: string;
    properties: {
      inverse: string;
      updated_at: string;
      multiple: string;
      created_at: string;
      target_id: string;
      id: string;
      source_id: string;
      project_edge_type_id: string;
    };
  }[];
};

export type Nodes = Node[];

export type Edges = Edge[];

type ProjectEdgeResponse = {
  nodes: Nodes;
  edges: Edges;
};

export const GET_SEARCH_DATA = '/neo4j/all-data/:project_id';

type GetProjectParam = {
  id?: string;
  projectId: string;
};

type QueryKey = Omit<GetProjectParam, 'url'> | string;

export type GetNeo4jData = {
  data: ProjectEdgeResponse;
};

type QueryResponse = {
  data: GetNeo4jData;
};

type Options = UseQueryOptions<QueryResponse, Error, GetNeo4jData, QueryKey[]>;

type Result = {
  nodes: Nodes | undefined;
  edges: Edges | undefined;
  isInitialLoading: boolean;
};

export const useGetSearchData = (options: Options = { enabled: true }, search: string): Result => {
  const params = useParams();

  const urlNodes = GET_SEARCH_DATA.replace(':project_id', params?.id || '');

  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes),
    ...options,
    onError: errorMessage,
  });

  const { data, isInitialLoading } = result;

  const { nodes, edges } = data?.data ?? {};

  return { isInitialLoading, nodes, edges };
};
