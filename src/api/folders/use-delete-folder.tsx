import { GET_PROJECTS_LIST } from 'api/projects/use-get-projects';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { GET_FOLDERS_LIST } from './use-get-folders';

export const FOLDER_DELETE_URL = 'folders/delete/:id';

export const useDeleteFolder = (folderId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => client.delete(FOLDER_DELETE_URL.replace(':id', folderId)),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries([GET_FOLDERS_LIST]);
        queryClient.invalidateQueries([GET_PROJECTS_LIST]);
      },
    }
  );
  return mutation;
};
