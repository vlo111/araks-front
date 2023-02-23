import { useMutation, useQueryClient } from 'react-query';

import client from '../client';
import { GET_FOLDERS_LIST } from './use-get-folders';

export type CreateFolderFormData = {
  folderName: string;
}

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ folderName }: CreateFolderFormData) => {
      const url = 'folders/create';
      return client.post(url, {
        title: folderName
      });
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(GET_FOLDERS_LIST);
      },
    }
  );
  return mutation;
};
