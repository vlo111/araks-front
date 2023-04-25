import { ProjectTypePropertyReturnData, RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { NodeEdgeTypesSubmit } from 'types/node-edge-types';
import { URL_GET_NODE_EDGE_TYPES_LIST } from './use-get-node-edge-types';

const URL_NODE_EDGE_TYPE_CREATE = '/node-edge-type/create';
// const URL_NODE_EDGE_TYPE_UPDATE = '/node-edge-type/update/:id';

type ReturnData = {
  data: ProjectTypePropertyReturnData;
};

type Options = UseQueryOptions<NodeEdgeTypesSubmit, Error, ReturnData>;

export const useCreateNodeEdgeType = (options?: Options) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, unknown, NodeEdgeTypesSubmit>({
    mutationFn: (values: NodeEdgeTypesSubmit) => {
      const url = URL_NODE_EDGE_TYPE_CREATE;
      //   const type = values.project_id ? RequestTypes.Put : RequestTypes.Post;
      const body = {
        ...values,
        project_id: params.id,
      };
      return client[RequestTypes.Post](url, body);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_GET_NODE_EDGE_TYPES_LIST.replace(':project_id', params.id || '')]);
      options?.onSuccess?.(data);
    },
  });
  return mutation;
};
