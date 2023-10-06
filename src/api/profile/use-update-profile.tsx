import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import { useAuth } from 'context/auth-context';
import { ProfileForm, UserDetails } from 'types/auth';

import client from '../client';

const url = 'users/update';

type ResponseType = {
  data: UserDetails;
};

type Options = UseQueryOptions<ProfileForm, unknown, ResponseType>;

export const useUpdateProfile = (options?: Options) => {
  const { addUser } = useAuth();
  const mutation = useMutation<ResponseType, unknown, ProfileForm>({
    mutationFn: (values: ProfileForm) => {
      return client.put(url, values);
    },
    onSuccess: (data) => {
      addUser({
        ...data.data,
      });
      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
