import { useMutation } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';
import client from '../client';

type param = {
  avatar: null | string;
};

const url = '/users/update-avatar';

export const useUpdateUserAvatar = () => {
  return useMutation({
    mutationFn: (values: param) => client.put(url, { ...values }),
    onError: errorMessage,
  });
};
