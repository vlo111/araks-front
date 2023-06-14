import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { GetProjectsParameters } from 'api/types';
import { useParams } from 'react-router-dom';
import { NodeDataListResponse, NodeDataResponse } from 'types/node';
import client from '../client';
import { URL_NODES_LIST } from './constants';

export const GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST = '/projects-edge-type/:edge_type_id/properties';

type ReturnData = {
  data: NodeDataListResponse;
};

type Options = UseQueryOptions<ReturnData, Error, NodeDataListResponse>;
type Result = UseQueryResult<NodeDataListResponse> & {
  rowsData: NodeDataResponse[];
  count: number;
};

export const useGetTypeNodes = (queryParams: GetProjectsParameters, typeId?: string, options?: Options): Result => {
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
