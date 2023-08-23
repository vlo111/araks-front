import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { ProjectEdgeResponse } from 'types/project-edge';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

export const GET_EDGES = '/edges/list/:project_id';

type GetProjectParam = {
  id?: string;
  projectId: string;
};

type QueryKey = Omit<GetProjectParam, 'url'> | string;

type ReturnData = {
  data: ProjectEdgeResponse[];
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;

type Result = { edges: ProjectEdgeResponse[] | undefined; isInitialLoading: boolean };

export const useGetVEdges = (options: Options = { enabled: true }): Result => {
  const params = useParams();
  const urlNodes = GET_EDGES.replace(':project_id', params?.id || '');
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes, { params }),
    ...options,
    onError: errorMessage,
  });
  const { data, isSuccess, isInitialLoading } = result;

  const edges = isSuccess ? data.data : undefined;

  return { isInitialLoading, edges };
};
