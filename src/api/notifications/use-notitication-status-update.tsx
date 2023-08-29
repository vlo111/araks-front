import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { URL_GET_NOTIFICATIONS_ALL_DATA, URL_UPDATE_NOTIFICATION_STATUS } from './constants';
import { errorMessage } from 'helpers/utils';

export const useNotificationStatusUpdate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (notificationId: string) => {
      return client.put(URL_UPDATE_NOTIFICATION_STATUS.replace(':id', notificationId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries([URL_GET_NOTIFICATIONS_ALL_DATA]);
    },
    onError: errorMessage,
  });
  return mutation;
};
