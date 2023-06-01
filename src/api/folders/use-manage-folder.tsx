import { RequestType, RequestTypes } from 'api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { GET_FOLDERS_LIST } from './use-get-folders';
import { errorMessage } from 'helpers/utils';

export type CreateFolderFormData = {
  folderName: string;
};

const FOLDER_CREATE_URL = 'folders/create';
export const FOLDER_UPDATE_URL = 'folders/update/:id';
export const FOLDER_DELETE_URL = 'folders/delete/:id';

export const useManageFolder = (url = FOLDER_CREATE_URL, type: RequestType = RequestTypes.Post) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ folderName }: CreateFolderFormData) => {
      return client[type](url, {
        title: folderName,
      });
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_FOLDERS_LIST]);
    },
    onError: errorMessage,
  });
  return mutation;
};
