import { useMutation, useQueryClient } from 'react-query';

import client from '../client';
import { GET_PROJECTS_LIST } from './use-get-projects';

export type MoveProjectToFormData = {
  projectId: number;
  folderId: number;
}

const URL = '/projects/move-to/:projectId/:folderId';

export const useMoveProjectTo = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ projectId, folderId }: MoveProjectToFormData) => {
      return client.post(URL.replace(':projectId', projectId.toString()).replace(':folderId', folderId.toString()), {});
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(GET_PROJECTS_LIST);
      },
    }
  );
  return mutation;
};
