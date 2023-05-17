import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { NodeDataResponse } from 'types/node';
import client from '../client';
import { URL_NODES_LIST } from './constants';

export const GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST = '/projects-edge-type/:edge_type_id/properties';

type ReturnData = {
  data: NodeDataResponse[];
};

type Options = UseQueryOptions<ReturnData, Error, NodeDataResponse[]>;
type Result = UseQueryResult<NodeDataResponse[]>;

export const useGetTypeNodes = (typeId?: string, options?: Options): Result => {
  const params = useParams();
  const urlNodes = URL_NODES_LIST.replace(':project_type_id', typeId || '').replace(':project_id', params.id || '');
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as NodeDataResponse[],
  } as Result;
};
