import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from 'api/client';
import { ProjectEdgeResponse } from 'types/project-edge';
import { errorMessage } from 'helpers/utils';
import { useIsPublicPage } from 'hooks/use-is-public-page';

export const GET_EDGES = '/projects-edge-type/list/:project_id';
export const GET_PUBLIC_EDGES = '/public/:project_id/edge-types';

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

export const useGetEdges = ({ ...params }: GetProjectParam, options: Options = { enabled: true }): Result => {
  const isPublicPage = useIsPublicPage();

  const urlNodes = (isPublicPage ? GET_PUBLIC_EDGES : GET_EDGES).replace(':project_id', params?.projectId || '');
  const result = useQuery({
    queryKey: [urlNodes, params],
    queryFn: () => client.get(urlNodes, { params }),
    ...options,
    onError: errorMessage,
  });
  const { data, isSuccess, isInitialLoading } = result;

  const edges = isSuccess ? data.data : undefined;

  return { isInitialLoading, edges };
};
