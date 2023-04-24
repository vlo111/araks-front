import { useMutation } from '@tanstack/react-query';
import { useAuth } from 'context/auth-context';
import { ProfileForm, User } from 'types/auth';

import client from '../client';

const url = 'users/update';

export const useUpdateProfile = () => {
  const { setUser } = useAuth();
  const mutation = useMutation<User, unknown, ProfileForm>({
    mutationFn: (values: ProfileForm) => {
      return client.put(url, values);
    },
    onSuccess: (data) => {
      setUser({
        ...data.user,
      });
    },
  });
  return mutation;
};
