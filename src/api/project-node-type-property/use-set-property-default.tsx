import { ProjectTypePropertyReturnData } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';
import { GET_PROJECT_NODE_TYPE_PROPERTIES_LIST } from './use-get-project-node-type-properties';
import { NodeTypePropertyDefault } from 'types/project-node-types-property';

export type MoveProjectToAllFormData = {
  projectId: string;
};

const URL_SET_PROPERTY_DEFAULT = '/node-type-property/:id/set-default-property';

type ReturnData = {
  data: ProjectTypePropertyReturnData;
};

type Options = UseQueryOptions<NodeTypePropertyDefault, Error, ReturnData>;

export const useSetPropertyDefault = (options?: Options) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, unknown, NodeTypePropertyDefault>({
    mutationFn: ({ propertyId, nodeTypeId }: NodeTypePropertyDefault) => {
      return client.put(URL_SET_PROPERTY_DEFAULT.replace(':id', propertyId), { project_type_id: nodeTypeId });
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([
        GET_PROJECT_NODE_TYPE_PROPERTIES_LIST.replace(':node_type_id', data.data.project_type_id || ''),
      ]);
      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
