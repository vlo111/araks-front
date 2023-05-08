import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';
import { EdgeTypePropertiesResponse } from './types';

export const GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST = '/projects-edge-type/:edge_type_id/properties';

type ReturnData = {
  data: EdgeTypePropertiesResponse;
};

type Options = UseQueryOptions<ReturnData, Error, EdgeTypePropertiesResponse>;
type Result = UseQueryResult<EdgeTypePropertiesResponse>;

export const useGetProjectsEdgeTypeProperties = (edgeypeId?: string, options?: Options): Result => {
  const urlNodes = GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST.replace(':edge_type_id', edgeypeId || '');
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as EdgeTypePropertiesResponse,
  } as Result;
};
