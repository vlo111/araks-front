import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

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
  edgeTypes: EdgeType[];
  edgeProperties: EdgeProperties[];
  nodeTypes: [
    {
      id: string;
      label: string;
      color: string;
    }
  ];
  nodeProperties: NodeProperty[];
};

export const GET_SEARCH_DATA = '/neo4j/autocomplete/:project_id';

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

type Result = {
  isInitialLoading: boolean;
} & GetNeo4jData;

export const useGetSearchData = (options: Options = { enabled: false }, search: string): Result => {
  const params = useParams();

  const urlNodes = GET_SEARCH_DATA.replace(':project_id', params?.id || '');

  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes, { params: { search } }),
    ...options,
    onError: errorMessage,
  });

  const { data, isInitialLoading } = result;

  return { isInitialLoading, data: data?.data ?? ({} as ProjectResponse) };
};
