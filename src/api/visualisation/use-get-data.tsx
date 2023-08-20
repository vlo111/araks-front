import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

type Node = {
  _fields: {
    labels: string[];
    properties: {
      project_type_id: string;
      updated_at: string;
      color: string;
      project_id: string;
      d285?: string;
      parent_node_type_id: string;
      surname?: string;
      image_url: string;
      name: string;
      created_at: string;
      id: string;
      username?: string;
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

export type Nodes = {
  records: Node[];
};

export type Edges = {
  records: Edge[];
};

type ProjectEdgeResponse = {
  nodes: Nodes;
  edges: Edges;
};

export const GET_EDGES = '/nodes/visualize-graph/:project_id';

type GetProjectParam = {
  id?: string;
  projectId: string;
};

type QueryKey = Omit<GetProjectParam, 'url'> | string;

type ReturnData = {
  data: {
    data: ProjectEdgeResponse;
  };
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;

type Result = {
  nodes: Node[] | undefined;
  edges: Edge[] | undefined;
  isInitialLoading: boolean;
};

export const useGetData = (options: Options = { enabled: true }): Result => {
  const params = useParams();

  const urlNodes = GET_EDGES.replace(':project_id', params?.id || '');

  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes, { params }),
    ...options,
    onError: errorMessage,
  });

  const { data, isInitialLoading } = result;

  const { nodes, edges } = data?.data.data ?? {};

  return { isInitialLoading, nodes: nodes?.records, edges: edges?.records };
};
