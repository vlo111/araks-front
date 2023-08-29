import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { NotificationsData, NotificationsParameters, NotificationsResponse } from 'api/types';
import client from '../client';
import { URL_GET_NOTIFICATIONS_ALL_DATA } from './constants';

type ReturnData = {
  data: NotificationsResponse;
};

type Options = UseQueryOptions<ReturnData, Error, NotificationsResponse>;
type Result = UseQueryResult<NotificationsResponse> & {
  rowsData: NotificationsData[];
  count: number;
};

export const useGetNotificationsAllData = (queryParams?: NotificationsParameters, options?: Options): Result => {
  const urlNodes = URL_GET_NOTIFICATIONS_ALL_DATA;

  const result = useQuery<ReturnData, Error, NotificationsResponse>({
    queryKey: [urlNodes, queryParams],
    queryFn: () => client.get(urlNodes, { params: queryParams }),
    select: (data) => data.data,
    keepPreviousData: true,
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as NotificationsResponse,
    rowsData: (isSuccess ? data.rows || [] : []) as NotificationsData[],
    count: (isSuccess ? data.count : 0) as number,
  } as Result;
};
