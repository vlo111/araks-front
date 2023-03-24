import { ProjectTypePropertyReturnData } from 'api/types';
import { TreeNodeType } from 'pages/data-sheet/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const GET_PROJECT_NODE_TYPE_PROPERTY = '/node-type-property/:type_property_id';

type ReturnData = {
  data: ProjectTypePropertyReturnData[];
};

// type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;
type Result = UseQueryResult<ProjectTypePropertyReturnData[]> & { formatted: TreeNodeType[] };

export const useGetProjectNodeTypeProperty = (propertyId?: string, options = { enabled: true }): Result => {
  const urlNodes = GET_PROJECT_NODE_TYPE_PROPERTY.replace(':node_type_id', propertyId || '');
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes),
    ...options,
    select: (data): ReturnData => data.data,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data.data : ([] as ProjectTypePropertyReturnData[]),
  } as Result;
};
