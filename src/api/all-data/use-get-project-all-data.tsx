import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { PageParameters } from 'api/types';
import { useParams } from 'react-router-dom';
import { AllDataListResponse, AllDataResponse } from 'types/node';
import client from '../client';
import { URL_GET_PROJECT_ALL_DATA } from './constants';

export const GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST = '/projects-edge-type/:edge_type_id/properties';

type ReturnData = {
  data: AllDataListResponse[];
};

type Options = UseQueryOptions<ReturnData[], Error, AllDataListResponse>;
type Result = UseQueryResult<AllDataListResponse> & {
  rowsData: AllDataResponse[];
  count: number;
};

export const useGetProjectAllData = (queryParams: PageParameters, options?: Options): Result => {
  const params = useParams();
  const urlNodes = URL_GET_PROJECT_ALL_DATA.replace(':project_id', params.id || '');
  const result = useQuery({
    queryKey: [urlNodes, queryParams],
    queryFn: () => client.post(urlNodes, { body: queryParams }).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as AllDataListResponse,
    rowsData: (isSuccess ? data.rows : []) as AllDataResponse[],
    count: (isSuccess ? data.count : 0) as number,
  } as Result;
};
