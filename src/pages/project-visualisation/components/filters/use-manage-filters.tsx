import { RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { ReturnData } from 'api/visualisation/use-get-data';

export const MANAGE_FILTERS = '/neo4j/filters/:project_id';

type Options = UseQueryOptions<string[], Error, ReturnData>;

export const useManageFilters = (options: Options) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation<ReturnData, unknown, string[]>({
    mutationFn: (values: string[]) => {
      const type = RequestTypes.Post;
      const url = MANAGE_FILTERS.replace(':project_id', params.id || '');
      const body = {
        ids: values,
      };
      return client[type](url, body);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([MANAGE_FILTERS.replace(':project_id', params.id || '')]);
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
