import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from 'api/client';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import { errorMessage } from 'helpers/utils';

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
    onError: errorMessage,
    enabled: !!edgeId,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ({} as EdgeTypePropertiesResponse),
  } as Result;
};
