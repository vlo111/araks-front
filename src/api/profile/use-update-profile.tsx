import { useMutation } from '@tanstack/react-query';
import { useAuth } from 'context/auth-context';
import { ProfileForm, UserDetails } from "types/auth";

import client from '../client';

const url = 'users/update';

export const useUpdateProfile = () => {
  const { setUser } = useAuth();
  const mutation = useMutation<{data: UserDetails}, unknown, ProfileForm>({
    mutationFn: (values: ProfileForm) => {
      return client.put(url, values);
    },
    onSuccess: (data) => {
      setUser({
        ...data.data,
      });
    },
  });
  return mutation;
};
