import { GET_FOLDERS_LIST } from 'api/folders/use-get-folders';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { GET_FOLDER_PROJECTS_LIST, GET_PROJECTS_LIST } from './use-get-projects';

export type MoveProjectToFormData = {
  projectId: string;
  folderId: string;
}

const URL = '/projects/move-to/:projectId/:folderId';

export const useMoveProjectTo = (insideFolderId?: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ projectId, folderId }: MoveProjectToFormData) => {
      return client.post(URL.replace(':projectId', projectId).replace(':folderId', folderId), {});
    },
    {
      onSuccess: (data, variables, context) => {
        if (insideFolderId) {
          queryClient.invalidateQueries([GET_FOLDER_PROJECTS_LIST.replace(':id', insideFolderId)]);
        }
        queryClient.invalidateQueries([GET_PROJECTS_LIST]);
        queryClient.invalidateQueries([GET_FOLDERS_LIST]);
      },
    }
  );
  return mutation;
};
