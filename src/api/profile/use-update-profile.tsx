import { useMutation } from '@tanstack/react-query';
import { useAuth } from 'context/auth-context';
import { ProfileForm, UserDetails } from "types/auth";

import client from '../client';

const url = 'users/update';

export const useUpdateProfile = () => {
  const { addUser } = useAuth();
  const mutation = useMutation<{data: UserDetails}, unknown, ProfileForm>({
    mutationFn: (values: ProfileForm) => {
      return client.put(url, values);
    },
    onSuccess: (data) => {
      addUser({
        ...data.data,
      });
    },
  });
  return mutation;
};
