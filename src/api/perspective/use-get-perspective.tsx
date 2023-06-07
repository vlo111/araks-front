import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { ResponsePerspectiveData } from './use-get-perspectives';

export const GET_PERSPECTIVE = '/perspectives/:id';

type ReturnData = {
  data: ResponsePerspectiveData;
};

type Options = UseQueryOptions<ReturnData, Error, ResponsePerspectiveData>;
type Result = UseQueryResult<ResponsePerspectiveData>;

export const useGetPerspective = (id?: string, options?: Options): Result => {
  const urlNodes = GET_PERSPECTIVE.replace(':id', id || '');
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.get(urlNodes),
    ...options,
    onError: errorMessage,
    enabled: !!id,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ({} as ResponsePerspectiveData),
  } as Result;
};
