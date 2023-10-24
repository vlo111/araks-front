import { RequestTypes } from 'api/types';
import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import { ProjectNodeTypeResponse } from 'types/project-node-types';

import client from '../client';
import { errorMessage } from 'helpers/utils';

export type ProjectEdgeTypeSubmit = {
  target_type_id: string;
  project_edge_type_id: string;
};

const URL_PROJECT_EDGE_TYPES_UPDATE = '/node-type-property/type-to-connection/:propertyId';

type ReturnData = {
  data: ProjectNodeTypeResponse;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;

export const useUpdateProjectEdgeType = (propertyId?: string, options?: Options) => {
  const url = URL_PROJECT_EDGE_TYPES_UPDATE.replace(':propertyId', propertyId || '');

  const mutation = useMutation<ReturnData, unknown, ProjectEdgeTypeSubmit>({
    mutationFn: ({ ...values }: ProjectEdgeTypeSubmit) => {
      return client[RequestTypes.Post](url, { ...values });
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
