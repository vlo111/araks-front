import { ProjectInfoReturnData } from 'api/types';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
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
  data: ProjectInfoReturnData;
}

type QueryResponse = {
  data: ReturnData
}

type Options = UseQueryOptions<QueryResponse, Error, ReturnData, QueryKey[]>;
type Result = UseQueryResult<ProjectInfoReturnData>;

const useGetProjectNoteTypes = ({url, ...params}: GetProjectParam, options: Options = { enabled: true }): Result => {
  const urlNodes = url.replace(':id', params?.id || '').replace(':project_id', params?.projectId || '');
  const result = useQuery([urlNodes, params], () => client.get(urlNodes, { params }), {
    ...options,
    select: (data): ReturnData => data.data
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : {} as ProjectInfoReturnData,
  } as Result;
};

export default useGetProjectNoteTypes;
