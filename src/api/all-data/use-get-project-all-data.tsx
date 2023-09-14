import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AllDataPageParameters } from 'api/types';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { useParams } from 'react-router-dom';
import { AllDataListResponse, AllDataResponse } from 'types/node';
import client from '../client';
import { URL_GET_PROJECT_ALL_DATA, URL_GET_PUBLIC_PROJECT_ALL_DATA } from './constants';

type ReturnData = {
  data: AllDataListResponse[];
};

type Options = UseQueryOptions<ReturnData[], Error, AllDataListResponse>;
type Result = UseQueryResult<AllDataListResponse> & {
  rowsData: AllDataResponse[];
  count: number;
};

export const useGetProjectAllData = ({ type, ...queryParams }: AllDataPageParameters, options?: Options): Result => {
  const isPublicPage = useIsPublicPage();
  const params = useParams();
  const urlNodes = (isPublicPage ? URL_GET_PUBLIC_PROJECT_ALL_DATA : URL_GET_PROJECT_ALL_DATA).replace(
    ':project_id',
    params.id || ''
  );
  const result = useQuery({
    queryKey: [urlNodes, queryParams],
    queryFn: () => client.post(urlNodes, queryParams).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as AllDataListResponse,
    rowsData: (isSuccess ? data.rows || [] : []) as AllDataResponse[],
    count: (isSuccess ? data.count : 0) as number,
  } as Result;
};
