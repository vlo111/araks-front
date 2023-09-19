import { useMutation, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';

type Options = UseQueryOptions<string, unknown, string>;

const url = 'auth/forgot-password';
const araksUrl = 'https://araks.analysed.ai/';

export const useForgotPassword = (options: Options) => {
  const mutation = useMutation<string, unknown, string>({
    mutationFn: (email) => {
      const values = { email, url: araksUrl };
      return client.post(url, values);
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
