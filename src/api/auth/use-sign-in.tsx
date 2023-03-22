import { useMutation } from '@tanstack/react-query';
import { useAuth } from 'context/auth-context';
import { SignInForm } from 'types/auth';

import client from '../client';

const url = 'auth/sign-in';

export const useSignIn = () => {
  const { login } = useAuth();
  const mutation = useMutation(
    (values: SignInForm) => {
      return client.post(url, values);
    },
    {
      onSuccess: ({ data }) => {
        login({
          user: data.user,
          access_token: data.access_token,
        });
      },
    }
  );
  return mutation;
};
