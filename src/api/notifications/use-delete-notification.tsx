import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';

import client from '../client';
import { URL_DELETE_NOTIFICATION, URL_GET_NOTIFICATIONS_ALL_DATA } from './constants';

export const useDeleteNotification = (options?: UseQueryOptions) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (notificationId: string) => client.delete(URL_DELETE_NOTIFICATION.replace(':id', notificationId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_GET_NOTIFICATIONS_ALL_DATA]);

      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
