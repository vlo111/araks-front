import { ProjectTypePropertyReturnData, RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

import client from '../client';
import { NodeEdgeTypesSubmit } from 'types/node-edge-types';
import { GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST } from './use-get-projects-edge-type-properties';
import { URL_GET_NODE_EDGE_TYPES_LIST } from './use-get-node-edge-types';
import { useParams } from 'react-router-dom';

const URL_NODE_EDGE_TYPE_CREATE = '/projects-edge-type/create';
const URL_NODE_EDGE_TYPE_UPDATE = '/projects-edge-type/update/:id';

type ReturnData = {
  data: ProjectTypePropertyReturnData;
};

type Options = UseQueryOptions<NodeEdgeTypesSubmit, Error, ReturnData>;

export const useCreateNodeEdgeType = (propertyId?: string, options?: Options) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const mutation = useMutation<ReturnData, unknown, NodeEdgeTypesSubmit>({
    mutationFn: (values: NodeEdgeTypesSubmit) => {
      const url = propertyId ? URL_NODE_EDGE_TYPE_UPDATE.replace(':id', propertyId || '') : URL_NODE_EDGE_TYPE_CREATE;
      const type = propertyId ? RequestTypes.Put : RequestTypes.Post;
      const body = {
        ...values,
        project_id: params.id,
      };
      return client[type](url, body);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_PROJECT_EDGE_TYPE_PROPERTIES_LIST.replace(':edge_type_id', propertyId || '')]);
      queryClient.invalidateQueries([URL_GET_NODE_EDGE_TYPES_LIST.replace(':project_id', params.id || '')]);
      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
