import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { ProjectNodeTypeSubmit } from 'types/project-node-types';

import client from '../client';
import { GET_PROJECT_NODE_TYPES_LIST } from './use-get-project-note-types';

export type MoveProjectToAllFormData = {
  projectId: string;
}

const URL_PROJECT_NODE_TYPES_CREATE = '/projects-node-types/create';
const URL_PROJECT_NODE_TYPES_UPDATE = '/projects-node-types/update/:id'

export const useCreateProjectNodeType = (isEdit: boolean) => {
  const params = useParams()
  const url = isEdit ? URL_PROJECT_NODE_TYPES_UPDATE.replace(':id', params.id || '') : URL_PROJECT_NODE_TYPES_CREATE;
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (values: ProjectNodeTypeSubmit) => {
      return client.post(url, { ...values, project_id: params.id });
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(GET_PROJECT_NODE_TYPES_LIST.replace(':project_id', params.id || ''));
      },
    }
  );
  return mutation;
};
