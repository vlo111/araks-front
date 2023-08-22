import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { RequestTypes } from 'api/types';
import client from 'api/client';
import { ProjectEdgeResponse } from 'types/project-edge';
import { GET_EDGES } from './use-get-edges';
import { GET_TYPES } from '../type/use-get-types';
import { errorMessage } from 'helpers/utils';
import { NodeEdgeTypesSubmit } from '../../../types/node-edge-types';

const URL_PROJECT_EDGE_CREATE = '/projects-edge-type/create';
const URL_PROJECT_EDGE_UPDATE = '/projects-edge-type/update/:id';

type ReturnData = {
  data: ProjectEdgeResponse;
};

type Options = UseQueryOptions<NodeEdgeTypesSubmit, Error, ReturnData>;

export const useCreateEdge = (id?: string, options?: Options) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const url = id ? URL_PROJECT_EDGE_UPDATE.replace(':id', id || '') : URL_PROJECT_EDGE_CREATE;

  const mutation = useMutation<ReturnData, unknown, ProjectEdgeResponse>({
    mutationFn: ({ ...values }: ProjectEdgeResponse) => {
      const type = id ? RequestTypes.Put : RequestTypes.Post;
      const body = { ...values };
      if (!id) body.project_id = params.id;
      return client[type](url, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([GET_TYPES.replace(':project_id', params.id || '')]);
      queryClient.invalidateQueries([GET_EDGES.replace(':project_id', params.id || '')]);
    },
    onError: errorMessage,
  });
  return mutation;
};
