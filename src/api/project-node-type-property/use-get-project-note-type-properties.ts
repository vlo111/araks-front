import { useParams } from 'react-router-dom';
import { ProjectTreeReturnData } from 'api/types';
import { createNodesTree } from 'components/layouts/components/data-sheet/utils';
import { TreeNodeType } from 'pages/data-sheet/types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const GET_PROJECT_NODE_TYPE_PROPERTIES_LIST = '/projects-node-types/:node_type_id/property';

type ReturnData = {
  data: ProjectTreeReturnData[];
}

type QueryResponse = {
  data: ReturnData
}

// type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;
type Result = UseQueryResult<ProjectTreeReturnData[]> & { formatted: TreeNodeType[] };

export const useGetProjectNoteTypeProperties = (options = { enabled: true }): Result => {
  const params = useParams()
  const urlNodes = GET_PROJECT_NODE_TYPE_PROPERTIES_LIST.replace(':node_type_id', params?.node_type_id || '');
  const result = useQuery([urlNodes], () => client.get(urlNodes), {
    ...options,
    select: (data): ReturnData => data.data
  });
  const { data, isSuccess } = result;
 
  return {
    ...result,
    data: isSuccess ? data.data : [] as ProjectTreeReturnData[],
  } as Result;
};
