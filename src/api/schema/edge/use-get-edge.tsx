import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../../client';
import { EdgeTypePropertiesResponse } from '../../node-edge-type/types';

export const GET_EDGE = '/projects-edge-type/:id';

type ReturnData = {
  data: EdgeTypePropertiesResponse;
};

type Options = UseQueryOptions<ReturnData, Error, EdgeTypePropertiesResponse>;
type Result = UseQueryResult<EdgeTypePropertiesResponse>;

export const useGetEdge = (edgeId?: string, options?: Options): Result => {
  const urlNodes = GET_EDGE.replace(':id', edgeId || '');
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes),
    ...options,
    enabled: !!edgeId,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ({} as EdgeTypePropertiesResponse),
  } as Result;
};
