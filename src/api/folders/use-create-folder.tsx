import { RequestType, RequestTypes } from 'api/types';
import { useMutation, useQueryClient } from 'react-query';

import client from '../client';
import { GET_FOLDERS_LIST } from './use-get-folders';

export type CreateFolderFormData = {
  folderName: string;
}

const FOLDER_CREATE_URL = 'folders/create';
export const FOLDER_UPDATE_URL = 'folders/update/:id';

export const useCreateFolder = (url = FOLDER_CREATE_URL, type: RequestType = RequestTypes.Post) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ folderName }: CreateFolderFormData) => {
      return client[type](url, {
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
