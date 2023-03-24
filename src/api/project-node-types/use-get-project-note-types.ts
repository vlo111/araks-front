import { ProjectTreeReturnData } from 'api/types';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { TreeNodeType } from 'pages/data-sheet/types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const GET_PROJECT_NODE_TYPES_PARENT = '/projects-node-types/get-parent/:id/:project_id';
export const GET_PROJECT_NODE_TYPES_LIST = '/projects-node-types/:project_id';

type GetProjectParam = {
  id?: string;
  projectId: string;
  url: string;
};

type QueryKey = Omit<GetProjectParam, 'url'> | string;

type ReturnData = {
  data: ProjectTreeReturnData[];
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;
type Result = UseQueryResult<ProjectTreeReturnData[]> & { formatted: TreeNodeType[] };

export const useGetProjectNoteTypes = (
  { url, ...params }: GetProjectParam,
  options: Options = { enabled: true }
): Result => {
  const urlNodes = url.replace(':id', params?.id || '').replace(':project_id', params?.projectId || '');
  const result = useQuery({
    queryKey: [urlNodes, params],
    queryFn: () => client.get(urlNodes, { params }),
    ...options,
    // select: (data): ReturnData => data.data,
  });
  const { data, isSuccess } = result;

  const formatted = isSuccess ? createNodesTree(data.data) : [];
  return {
    ...result,
    data: isSuccess ? data.data : ([] as ProjectTreeReturnData[]),
    formatted,
  } as Result;
};
