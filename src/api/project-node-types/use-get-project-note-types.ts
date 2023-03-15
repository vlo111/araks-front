import { ProjectTreeReturnData } from 'api/types';
import { createNodesTree, createNodesTreeLabel } from 'components/layouts/components/data-sheet/utils';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { TreeStructure, TreeStructureLabel } from 'types/project';
import client from '../client';

export const GET_PROJECT_NODE_TYPES_PARENT = '/projects-node-types/get-parent/:id/:project_id';
export const GET_PROJECT_NODE_TYPES_LIST = '/projects-node-types/get-list/:project_id';

type GetProjectParam = {
  id?: string;
  projectId: string;
  url: string;
}

type QueryKey = Omit<GetProjectParam, 'url'> | string;

type ReturnData = {
  data: ProjectTreeReturnData[];
}

type QueryResponse = {
  data: ReturnData
}

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;
type Result = UseQueryResult<ProjectTreeReturnData[]> & { formatted: TreeStructure[], formattedSelect: TreeStructureLabel[] };

const useGetProjectNoteTypes = ({url, ...params}: GetProjectParam, options: Options = { enabled: true }): Result => {
  const urlNodes = url.replace(':id', params?.id || '').replace(':project_id', params?.projectId || '');
  const result = useQuery([urlNodes, params], () => client.get(urlNodes, { params }), {
    ...options,
    select: (data): ReturnData => data.data
  });
  const { data, isSuccess } = result;
  const formatted = isSuccess ? createNodesTree(data.data) : [];
  const formattedSelect = isSuccess ? createNodesTreeLabel(data.data) : [];
  return {
    ...result,
    data: isSuccess ? data.data : [] as ProjectTreeReturnData[],
    formatted,
    formattedSelect,
  } as Result;
};

export default useGetProjectNoteTypes;
