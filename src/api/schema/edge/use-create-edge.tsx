import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RequestTypes } from '../../types';
import client from '../../client';
import { ProjectEdgeResponse } from '../../../types/project-edge';
import { GET_TYPES } from '../type/use-get-types';

const URL_PROJECT_EDGE_CREATE = '/projects-edge-type/create';

type ReturnData = {
  data: ProjectEdgeResponse;
};

export const useCreateEdge = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, unknown, ProjectEdgeResponse>({
    mutationFn: ({ ...values }: ProjectEdgeResponse) => {
      const body = { ...values, project_id: params.id };
      return client[RequestTypes.Post](URL_PROJECT_EDGE_CREATE, body);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_TYPES.replace(':project_id', params.id || '')]);
    },
  });
  return mutation;
};
