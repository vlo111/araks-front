import { RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ProjectNodeTypeResponse, ProjectNodeTypeSubmit } from 'types/project-node-types';

import client from '../client';
import { GET_PROJECT_NODE_TYPE_PROPERTIES_LIST } from './use-get-project-note-type-properties';

export type MoveProjectToAllFormData = {
  projectId: string;
}

const URL_PROJECT_NODE_TYPE_PROPERTY_CREATE = '/node-type-property/create';
const URL_PROJECT_NODE_TYPE_PROPERTY_UPDATE = '/node-type-property/update/:id';

type ReturnData = {
  data: {
    data: ProjectNodeTypeResponse
  };
}

type QueryResponse = {
  data: ReturnData
}

type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;

export const useCreateProjectNodeTypeProperty = (options: Options, nodeTypePropertyId?: string,) => {
  const params = useParams()
  const url = nodeTypePropertyId ? URL_PROJECT_NODE_TYPE_PROPERTY_UPDATE.replace(':id', nodeTypePropertyId || '') : URL_PROJECT_NODE_TYPE_PROPERTY_CREATE;
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({parent_id, ...values}: ProjectNodeTypeSubmit) => {
      const type = nodeTypePropertyId ? RequestTypes.Put : RequestTypes.Post;
      const body = nodeTypePropertyId ? values : { ...values, project_id: params.id, ...(parent_id ? { parent_id } : {}) };
      return client[type](url, body);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries([GET_PROJECT_NODE_TYPE_PROPERTIES_LIST.replace(':node_type_id', data.data.id || '')]);
        options?.onSuccess?.(data);
      },
    }
  );
  return mutation;
};

