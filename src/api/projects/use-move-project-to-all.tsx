import { GET_FOLDERS_LIST } from 'api/folders/use-get-folders';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { GET_FOLDER_PROJECTS_LIST, GET_PROJECTS_LIST } from './use-get-projects';
import { errorMessage } from 'helpers/utils';

export type MoveProjectToAllFormData = {
  projectId: string;
};

const URL = '/projects/move-to-all/:projectId';

export const useMoveProjectToAll = (folderId?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ projectId }: MoveProjectToAllFormData) => {
      return client.post(URL.replace(':projectId', projectId.toString()), {});
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_FOLDER_PROJECTS_LIST.replace(':id', folderId || '')]);
      queryClient.invalidateQueries([GET_PROJECTS_LIST]);
      queryClient.invalidateQueries([GET_FOLDERS_LIST]);
    },
    onError: errorMessage,
  });
  return mutation;
};
