import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

type ProjectResponse = {
  data: {
    nodes: [
      {
        _fields: {
          labels: string;
          properties: {
            project_type_id: string;
            project_type_parent_id: string;
            updated_at: string;
            color: string;
            project_id: string;
            user_id: string;
            name: string;
            typy: string;
            created_at: string;
            default_image: string;
            id: string;
          };
        };
      }
    ];
    edges: [
      {
        _fields: {
          type: string;
          properties: {
            edge_target_id: string;
            inverse: string;
            updated_at: string;
            edge_source_id: string;
            project_id: string;
            user_id: string;
            multiple: string;
            created_at: string;
            target_id: string;
            source_id: string;
            id: string;
            project_edge_type_id: string;
          };
        }[];
      }
    ];
  };
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

type Result = {
  isInitialLoading: boolean;
} & GetNeo4jData;

export const useGetSelectedSearchData = (options: Options = { enabled: false }, search: string): Result => {
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
