import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { PageParameters } from 'api/types';
import { useParams } from 'react-router-dom';
import { ETypeEdgeData, ETypeEdgeDataResponse } from 'types/edges';
import client from '../client';
import { URL_EDGES_NODE_DATA } from './constants';

type ReturnData = {
  data: ETypeEdgeDataResponse;
};

type Options = UseQueryOptions<ReturnData, Error, ETypeEdgeDataResponse>;
type Result = UseQueryResult<ETypeEdgeDataResponse> & {
  rowsData: ETypeEdgeData[];
  count: number;
};

export const useGetEdgesNodeData = (queryParams: PageParameters, typeId?: string, options?: Options): Result => {
  const params = useParams();
  const urlNodes = URL_EDGES_NODE_DATA.replace(':edge_type_id', typeId || '').replace(':project_id', params.id || '');
  const result = useQuery({
    queryKey: [urlNodes, queryParams],
    queryFn: () => client.get(urlNodes, { params: queryParams }).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as ETypeEdgeDataResponse,
    rowsData: (isSuccess ? data.rows : []) as ETypeEdgeData[],
    count: (isSuccess ? data.count : 0) as number,
  } as Result;
};
