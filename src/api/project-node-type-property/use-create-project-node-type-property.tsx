import { RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ProjectNodeTypeResponse } from 'types/project-node-types';

import client from '../client';
import { GET_PROJECT_NODE_TYPE_PROPERTIES_LIST } from './use-get-project-node-type-properties';
import { ProjectNodeTypePropertySubmit } from 'types/project-node-types-property';

export type MoveProjectToAllFormData = {
  projectId: string;
};

const URL_PROJECT_NODE_TYPE_PROPERTY_CREATE = '/node-type-property/create';
const URL_PROJECT_NODE_TYPE_PROPERTY_UPDATE = '/node-type-property/update/:id';

type ReturnData = {
  data: {
    data: ProjectNodeTypeResponse;
  };
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;

export const useCreateProjectNodeTypeProperty = (options: Options, nodeTypePropertyId?: string) => {
  const params = useParams();
  const url = nodeTypePropertyId
    ? URL_PROJECT_NODE_TYPE_PROPERTY_UPDATE.replace(':id', nodeTypePropertyId || '')
    : URL_PROJECT_NODE_TYPE_PROPERTY_CREATE;
  const queryClient = useQueryClient();
  const mutation = useMutation({ mutationFn: (values: ProjectNodeTypePropertySubmit) => {
      const type = nodeTypePropertyId ? RequestTypes.Put : RequestTypes.Post;
      const body = {
        ...values,
        project_id: params.id,
        project_type_id: params.node_type_id,
      };
      return client[type](url, body);
    }, onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries([
          GET_PROJECT_NODE_TYPE_PROPERTIES_LIST.replace(':node_type_id', data.data.id || ''),
        ]);
        options?.onSuccess?.(data);
      } });
  return mutation;
};
