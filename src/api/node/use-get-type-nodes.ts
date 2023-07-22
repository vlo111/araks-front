import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { PageParameters } from 'api/types';
import { useParams } from 'react-router-dom';
import { NodeDataListResponse, NodeDataResponse } from 'types/node';
import client from '../client';
import { URL_NODES_LIST } from './constants';

type ReturnData = {
  data: NodeDataListResponse;
};

type Options = UseQueryOptions<ReturnData, Error, NodeDataListResponse>;
type Result = UseQueryResult<NodeDataListResponse> & {
  rowsData: NodeDataResponse[];
  count: number;
};

export const useGetTypeNodes = (queryParams: PageParameters, typeId?: string, options?: Options): Result => {
  const params = useParams();
  const urlNodes = URL_NODES_LIST.replace(':project_type_id', typeId || '').replace(':project_id', params.id || '');
  const result = useQuery({
    queryKey: [urlNodes, queryParams],
    queryFn: () => client.get(urlNodes, { params: queryParams }).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as NodeDataListResponse,
    rowsData: (isSuccess ? data.rows : []) as NodeDataResponse[],
    count: (isSuccess ? data.count : 0) as number,
  } as Result;
};
