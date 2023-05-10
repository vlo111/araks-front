import { useMutation } from '@tanstack/react-query';
import { PasswordResponseData, PasswordResponseDataError, ProfilePassword } from 'types/auth';

import client from '../client';
import { message } from 'antd';

const url = 'users/change-password';

export const useUpdatePassword = () => {
  const mutation = useMutation<PasswordResponseData, PasswordResponseDataError, ProfilePassword>({
    mutationFn: (values: ProfilePassword) => {
      return client.put(url, values);
    },
    onSuccess: () => message.success('Password successfully changed').then((r) => r),
    onError: (data) => message.error(data.response.data.message).then((r) => r),
  });
  return mutation;
};
