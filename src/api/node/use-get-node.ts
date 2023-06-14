import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { NodeDataResponse } from 'types/node';
import client from '../client';
import { URL_GET_NODE } from './constants';

type ReturnData = {
  data: NodeDataResponse;
};

type Options = UseQueryOptions<ReturnData, Error, NodeDataResponse>;
type Result = UseQueryResult<NodeDataResponse>;

export const useGetNode = (id: string, options?: Options): Result => {
  const urlNodes = URL_GET_NODE.replace(':id', id || '');
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as NodeDataResponse,
  } as Result;
};
