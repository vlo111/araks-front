import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const GET_PROJECT_EDGE_TYPES = '/edges/between-types/:source_type_id/:target_type_id';

type Data = {
  id: string;
  name: string;
}[];

type ReturnData = {
  data: Data;
};

type Options = UseQueryOptions<ReturnData, Error, Data>;
type Result = UseQueryResult<Data>;

export const useGetProjectEdgeTypes = (sourceId?: string, targetId?: string, options?: Options): Result => {
  const urlTypes = GET_PROJECT_EDGE_TYPES.replace(':source_type_id', sourceId || '').replace(
    ':target_type_id',
    targetId || ''
  );

  const result = useQuery({
    queryKey: [urlTypes],
    queryFn: () => client.get(urlTypes),
    ...options,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ([] as Data),
  } as Result;
};
