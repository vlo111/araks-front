import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { PageParameters } from 'api/types';
import { useParams } from 'react-router-dom';
import { ConnectionSourcesSearchResult } from 'types/node';
import client from '../client';
import { URL_GET_CONNECTION_SOURCE_LIST } from './constants';

type ReturnData = {
  data: ConnectionSourcesSearchResult[];
};

type SearchParams = PageParameters & {
  search: string;
};

type Options = UseQueryOptions<ReturnData, Error, ConnectionSourcesSearchResult[]>;
type Result = UseQueryResult<ConnectionSourcesSearchResult[]>;

export const useGetConnectionSourceSearch = (queryParams: SearchParams, typeId?: string, options?: Options): Result => {
  const params = useParams();
  const urlNodes = URL_GET_CONNECTION_SOURCE_LIST.replace(':project_type_id', typeId || '').replace(
    ':project_id',
    params.id || ''
  );
  const result = useQuery({
    queryKey: [urlNodes, queryParams],
    queryFn: () => client.get(urlNodes, { params: queryParams }).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : []) as ConnectionSourcesSearchResult[],
  } as Result;
};
