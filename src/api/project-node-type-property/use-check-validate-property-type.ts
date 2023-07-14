import { CheckPropertyBody, CheckPropertyResponse } from 'api/types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import client from '../client';

export const CHECK_VALIDATE_DATA_URL = '/node-type-property/:id/check-validate-data';

type ReturnData = {
  data: CheckPropertyResponse;
};

type Options = UseQueryOptions<ReturnData, Error, CheckPropertyResponse>;
type Result = UseQueryResult<CheckPropertyResponse>;

export const useCheckValidatePropertyType = (id: string, body: CheckPropertyBody, options?: Options): Result => {
  const urlNodes = CHECK_VALIDATE_DATA_URL.replace(':id', id);
  const result = useQuery({
    queryKey: [urlNodes],
    queryFn: () => client.post(urlNodes, body).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data : ({} as CheckPropertyResponse),
  } as Result;
};
