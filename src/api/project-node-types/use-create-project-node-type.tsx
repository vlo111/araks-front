import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { ProjectNodeTypeSubmit } from 'types/project-node-types';

import client from '../client';
import { GET_PROJECT_NODE_TYPES_LIST } from './use-get-project-note-types';

export type MoveProjectToAllFormData = {
  projectId: string;
}

const URL = '/projects-node-types/create';

export const useCreateProjectNodeType = () => {
  const params = useParams()
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (values: ProjectNodeTypeSubmit) => {
      return client.post(URL, { ...values, project_id: params.id });
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(GET_PROJECT_NODE_TYPES_LIST.replace(':project_id', params.id || ''));
      },
    }
  );
  return mutation;
};
