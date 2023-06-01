import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { GET_FOLDERS_LIST } from 'api/folders/use-get-folders';
import { GET_FOLDER_PROJECTS_LIST, GET_PROJECTS_LIST, GET_PROJECTS_PUBLIC_LIST } from 'api/projects/use-get-projects';
import { PATHS } from 'helpers/constants';

import client from '../client';
import { errorMessage } from 'helpers/utils';

export const FOLDER_DELETE_URL = 'projects/delete/:id';

type ReturnType = {
  folderId: string;
};

type Props = {
  projectId: string;
  folderId?: string;
};

export const useDeleteProject = ({ projectId, folderId }: Props) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const mutation = useMutation<ReturnType>({
    mutationFn: () => client.delete(FOLDER_DELETE_URL.replace(':id', projectId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_FOLDERS_LIST]);
      if (folderId) {
        queryClient.invalidateQueries([GET_FOLDER_PROJECTS_LIST.replace(':id', folderId)]);
      } else {
        queryClient.invalidateQueries([GET_FOLDERS_LIST]);
      }
      if (location.pathname === PATHS.PUBLIC) {
        queryClient.invalidateQueries([GET_PROJECTS_PUBLIC_LIST]);
      }
      queryClient.invalidateQueries([GET_PROJECTS_LIST]);
    },
    onError: errorMessage,
  });
  return mutation;
};
