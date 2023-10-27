import { useMutation } from '@tanstack/react-query';
import { useAuth } from 'context/auth-context';
import { SignInForm, User } from 'types/auth';

import client from '../client';
import { errorMessage } from 'helpers/utils';

const url = 'auth/sign-in';

export const useSignIn = () => {
  const { login } = useAuth();
  const mutation = useMutation<User, unknown, SignInForm>({
    mutationFn: (values: SignInForm) => {
      return client.post(url, values);
    },
    onSuccess: (data) => {
      const avatar = data.user.avatar?.includes('gravatar')
        ? data.user.avatar
        : `${process.env.REACT_APP_AWS_URL}${data.user.avatar}`;
      login({
        user: { ...data.user, avatar },
        access_token: data.access_token,
      });
    },
    onError: errorMessage,
  });
  return mutation;
};
