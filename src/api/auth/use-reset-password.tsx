import { useMutation, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';
import { ResetPasswordForm } from '../../types/auth';

type Options = UseQueryOptions<string, unknown, string>;

const url = 'auth/reset-password';

export const useResetPassword = (options: Options) => {
  const mutation = useMutation<string, unknown, ResetPasswordForm>({
    mutationFn: (values: ResetPasswordForm) => {
      return client.post(url, values);
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
