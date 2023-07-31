import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { GET_FOLDERS_LIST } from 'api/folders/use-get-folders';
import {
  GET_FOLDER_PROJECTS_LIST,
  GET_PROJECTS_LIST,
  GET_PROJECTS_PUBLIC_LIST,
  GET_PROJECTS_SHARED,
} from 'api/projects/use-get-projects';
import { PATHS } from 'helpers/constants';

import client from '../client';
import { errorMessage } from 'helpers/utils';

export const PROJECT_DELETE_URL = 'projects/delete/:id';
export const SHARED_PROJECT_DELETE_URL = 'shared/delete/:id';

type ReturnType = {
  folderId: string;
};

type Props = {
  projectId: string;
  folderId?: string;
  url?: string;
};

export const useDeleteProject = ({ projectId, folderId, url = PROJECT_DELETE_URL }: Props) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const mutation = useMutation<ReturnType>({
    mutationFn: () => client.delete(url.replace(':id', projectId)),
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
      if (location.pathname === PATHS.SHARED) {
        queryClient.invalidateQueries([GET_PROJECTS_SHARED]);
      }
      queryClient.invalidateQueries([GET_PROJECTS_LIST]);
    },
    onError: errorMessage,
  });
  return mutation;
};
