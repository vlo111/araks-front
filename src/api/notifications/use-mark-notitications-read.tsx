import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { message } from 'antd';
import { URL_GET_NOTIFICATIONS_ALL_DATA, URL_MARK_NOTIFICATIONS_READ } from './constants';
import { errorMessage } from 'helpers/utils';

export const useMarkNotificationsRead = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return client.put(URL_MARK_NOTIFICATIONS_READ);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([URL_GET_NOTIFICATIONS_ALL_DATA]);
      message.success('Password successfully changed');
    },
    onError: errorMessage,
  });
  return mutation;
};
