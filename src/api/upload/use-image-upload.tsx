import { useMutation, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';
import { errorMessage } from 'helpers/utils';
import { RcFile } from 'antd/es/upload';
import { AVATAR_UPLOAD_URL } from './constants';
type Options = UseQueryOptions<string | RcFile | Blob, unknown, Response>;

type Response = {
  data: {
    originalFileName: string;
    uploadPath: string;
  };
};

export const useAvatarUpload = (options?: Options) => {
  const mutation = useMutation<Response, unknown, string | RcFile | Blob>(
    async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      return client.post(AVATAR_UPLOAD_URL, formData);
    },
    {
      onSuccess: (data) => {
        options?.onSuccess?.(data);
      },
      onError: errorMessage,
    }
  );
  return mutation;
};
