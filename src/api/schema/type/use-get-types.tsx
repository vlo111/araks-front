import { IProjectType, ProjectFullInfo } from 'api/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import client from '../../client';
import { errorMessage } from 'helpers/utils';
import { useIsPublicPage } from 'hooks/use-is-public-page';

export const GET_TYPES = '/projects/:project_id/node-types';
export const GET_PUBLIC_TYPES = '/public/:project_id/node-types';

type GetProjectParam = {
  id?: string;
  projectId: string;
};

type QueryKey = Omit<GetProjectParam, 'url'> | string;

type ReturnData = {
  data: ProjectFullInfo;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;

type Result = { nodes: IProjectType[]; isInitialLoading: boolean };

export const useGetTypes = ({ ...params }: GetProjectParam, options: Options = { enabled: true }): Result => {
  const isPublicPage = useIsPublicPage();

  const urlNodes = (isPublicPage ? GET_PUBLIC_TYPES : GET_TYPES).replace(':project_id', params?.projectId || '');
  const result = useQuery({
    queryKey: [urlNodes, params],
    queryFn: () => client.get(urlNodes, { params }),
    ...options,
    onError: errorMessage,
  });
  const { data, isSuccess } = result;

  const nodes = isSuccess ? data.data.projectsNodeTypes : undefined;

  return {
    ...result,
    nodes,
  } as Result;
};
