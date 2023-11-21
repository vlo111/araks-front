import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { NodeDataResponse } from 'types/node';
import client from '../client';

const URL_GET_ENUM = '/enums/:enum_id';

type ReturnData = {
  data: { id: string; name: string }[];
};

type Options = UseQueryOptions<ReturnData, Error, NodeDataResponse>;
type Result = UseQueryResult<NodeDataResponse>;

export const useGetEnum = (id: string, options?: Options): Result => {
  const urlNodes = URL_GET_ENUM.replace(':enum_id', id || '');
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : []) as NodeDataResponse,
  } as Result;
};
