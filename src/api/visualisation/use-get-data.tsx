import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';
import { useIsPublicPage } from 'hooks/use-is-public-page';

export type Node = {
  id: string;
  _fields: [
    {
      labels: string[];
      properties: {
        [key: string]: never;
      };
      identity?: { low: number };
    },
    { low: number }
  ];
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
  count: number;
  relationsCounts: { [key: string]: number };
};

export const GET_ALL_DATA = '/neo4j/all-data/:project_id';
export const GET_ALL_PUBLIC_DATA = '/public/neo4j/all-data/:project_id';

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
  count: number;
  relationsCounts: { [key: string]: number };
  isInitialLoading: boolean;
};

export const useGetData = (options: Options = { enabled: true }, search?: string): Result => {
  const params = useParams();

  const isPublicPage = useIsPublicPage();

  const urlAllData = isPublicPage ? GET_ALL_PUBLIC_DATA : GET_ALL_DATA;

  const url = urlAllData.replace(':project_id', params?.id || '');

  const result = useQuery({
    queryKey: [url],
    queryFn: () => client.get(url, { params: { search } }),
    ...options,
    onError: errorMessage,
  });

  const { data, isInitialLoading } = result;

  const { nodes, edges, count, relationsCounts } = data?.data ?? {};

  return { isInitialLoading, nodes, edges, count: count ?? 0, relationsCounts: relationsCounts || {} };
};
