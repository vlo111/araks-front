import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { PageParameters } from 'api/types';
import { useParams } from 'react-router-dom';
import { AllDataDocumentListResponse, AllDataDocumentResponse } from 'types/node';
import client from '../client';
import { URL_GET_PROJECT_ALL_DOCUMENTS } from './constants';

type ReturnData = {
  data: AllDataDocumentListResponse[];
};

type Options = UseQueryOptions<ReturnData[], Error, AllDataDocumentListResponse>;
type Result = UseQueryResult<AllDataDocumentListResponse> & {
  rowsData: AllDataDocumentResponse[];
  count: number;
};

export const useGetProjectAllDocuments = (queryParams: PageParameters, options?: Options): Result => {
  const params = useParams();
  const urlNodes = URL_GET_PROJECT_ALL_DOCUMENTS.replace(':project_id', params.id || '');
  const result = useQuery({
    queryKey: [urlNodes, queryParams],
    queryFn: () => client.post(urlNodes, queryParams).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as AllDataDocumentListResponse,
    rowsData: (isSuccess ? data.rows || [] : []) as AllDataDocumentResponse[],
    count: (isSuccess ? data.count : 0) as number,
  } as Result;
};
