import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';
import { Edges, Nodes } from './use-get-data';
import { useIsPublicPage } from 'hooks/use-is-public-page';

export type NodeProperty = {
  id: string;
  label: string;
  color: string;
  [name: string]: string;
};

export type EdgeType = {
  id: string;
  relation: string;
  source_id: string;
  target_id: string;
  source_name: null;
  target_name: null;
  source_color: null;
  target_color: null;
};

export type EdgeProperties = {
  relation: string;
  id: string;
  source_id: string;
  target_id: string;
  source_name: string;
  source_color: string;
  target_name: string;
  target_color: string;
  [name: string]: string;
};

type ProjectResponse = {
  nodes: Nodes;
  edges: Edges;
  relationsCounts: { [key: string]: number };
};

export const GET_SHORTEST_DATA = '/neo4j/shortest-path/:project_id';
export const GET_SHORTEST_PUBLIC_DATA = '/public/neo4j/shortest-path/:project_id';

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

export const useGetShortestPath = (options: Options = { enabled: false }) => {
  const params = useParams();

  const isPublicPage = useIsPublicPage();

  const urlAllData = isPublicPage ? GET_SHORTEST_PUBLIC_DATA : GET_SHORTEST_DATA;

  const url = urlAllData.replace(':project_id', params?.id || '');

  const result = useMutation({
    mutationKey: [url],
    mutationFn: ({ start, end }: { start: string; end: string }) => client.get(url, { params: { start, end } }),
    onSuccess: options.onSuccess,
    onError: errorMessage,
  });

  return result;
};
