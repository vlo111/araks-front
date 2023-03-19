import { RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ProjectNodeTypeResponse, ProjectNodeTypeSubmit } from 'types/project-node-types';

import client from '../client';
import { GET_PROJECT_NODE_TYPES_LIST } from './use-get-project-note-types';

export type MoveProjectToAllFormData = {
  projectId: string;
}

const URL_PROJECT_NODE_TYPES_CREATE = '/projects-node-types/create';
const URL_PROJECT_NODE_TYPES_UPDATE = '/projects-node-types/update/:id';

type ReturnData = {
  data: {
    data: ProjectNodeTypeResponse
  };
}

type QueryResponse = {
  data: ReturnData
}

type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;

export const useCreateProjectNodeType = (options: Options, nodeTypeId?: string,) => {
  const params = useParams()
  const url = nodeTypeId ? URL_PROJECT_NODE_TYPES_UPDATE.replace(':id', nodeTypeId || '') : URL_PROJECT_NODE_TYPES_CREATE;
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({parent_id, ...values}: ProjectNodeTypeSubmit) => {
      const type = nodeTypeId ? RequestTypes.Put : RequestTypes.Post;
      const body = nodeTypeId ? {...values, ...(parent_id ? { parent_id } : {})} : { ...values, project_id: params.id, parent_id };
      console.log(body, parent_id, 'parent')
      return client[type](url, body);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries([GET_PROJECT_NODE_TYPES_LIST.replace(':project_id', params.id || '')]);
        options?.onSuccess?.(data);
      },
    }
  );
  return mutation;
};

