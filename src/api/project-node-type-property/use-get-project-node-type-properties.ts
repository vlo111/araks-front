import { ProjectTypePropertyReturnData } from 'api/types';
import { TreeNodeType } from 'pages/data-sheet/types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const GET_PROJECT_NODE_TYPE_PROPERTIES_LIST = '/projects-node-types/:node_type_id/property';

type ReturnData = {
  data: ProjectTypePropertyReturnData[];
};

type Options = UseQueryOptions<ReturnData, Error, ProjectTypePropertyReturnData[]>;
type Result = UseQueryResult<ProjectTypePropertyReturnData[]> & { formatted: TreeNodeType[] };

export const useGetProjectNodeTypeProperties = (nodeTypeId?: string, options?: Options): Result => {
  const urlNodes = GET_PROJECT_NODE_TYPE_PROPERTIES_LIST.replace(':node_type_id', nodeTypeId || '');
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ([] as ProjectTypePropertyReturnData[]),
  } as Result;
};
