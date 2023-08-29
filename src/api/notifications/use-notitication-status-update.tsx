import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { URL_GET_NOTIFICATIONS_ALL_DATA, URL_UPDATE_NOTIFICATION_STATUS } from './constants';
import { errorMessage } from 'helpers/utils';

export const useNotificationStatusUpdate = (options?: UseMutationOptions<boolean, unknown, string>) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<boolean, unknown, string>({
    mutationFn: (notificationId: string) => {
      return client.put(URL_UPDATE_NOTIFICATION_STATUS.replace(':id', notificationId));
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_GET_NOTIFICATIONS_ALL_DATA]);
      options?.onSuccess?.(data, variables, context);
    },
    onError: errorMessage,
  });
  return mutation;
};
