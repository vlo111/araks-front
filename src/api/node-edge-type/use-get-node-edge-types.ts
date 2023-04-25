import { ProjectTypePropertyReturnData } from 'api/types';
import { TreeNodeType } from 'pages/data-sheet/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const URL_GET_NODE_EDGE_TYPES_LIST = '/node-edge-type/:project_id';

type Result = UseQueryResult<ProjectTypePropertyReturnData[]> & { formatted: TreeNodeType[] };

export const useGetNodeEdgeTypes = (nodeTypeId: string, options = { enabled: true }): Result => {
  const urlNodes = URL_GET_NODE_EDGE_TYPES_LIST.replace(':project_id', nodeTypeId);
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data.data : ([] as ProjectTypePropertyReturnData[]),
  } as Result;
};
