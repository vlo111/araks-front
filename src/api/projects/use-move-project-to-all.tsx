import { GET_FOLDERS_LIST } from 'api/folders/use-get-folders';
import { useMutation, useQueryClient } from 'react-query';

import client from '../client';
import { GET_PROJECTS_LIST } from './use-get-projects';

export type MoveProjectToAllFormData = {
  projectId: number;
}

const URL = '/projects/move-to-all/:projectId';

export const useMoveProjectToAll = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ projectId }: MoveProjectToAllFormData) => {
      return client.post(URL.replace(':projectId', projectId.toString()), {});
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(GET_PROJECTS_LIST);
        queryClient.invalidateQueries(GET_FOLDERS_LIST);
      },
    }
  );
  return mutation;
};
