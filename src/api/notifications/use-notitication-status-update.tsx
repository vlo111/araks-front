import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import client from '../client';
import { URL_UPDATE_NOTIFICATION_STATUS } from './constants';
import { errorMessage } from 'helpers/utils';

export const useNotificationStatusUpdate = (options?: UseMutationOptions<boolean, unknown, string>) => {
  const mutation = useMutation<boolean, unknown, string>({
    mutationFn: (notificationId: string) => {
      return client.put(URL_UPDATE_NOTIFICATION_STATUS.replace(':id', notificationId));
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: errorMessage,
  });
  return mutation;
};
