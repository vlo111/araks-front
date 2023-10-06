import { RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from 'api/client';
import { errorMessage } from 'helpers/utils';
import { GetNeo4jData } from 'api/visualisation/use-get-data';
import { useIsPublicPage } from 'hooks/use-is-public-page';

export const MANAGE_FILTERS = '/neo4j/filters/:project_id';
export const MANAGE_FILTERS_PUBLIC = '/public/neo4j/filters/:project_id';

type Options = UseQueryOptions<string[], Error, GetNeo4jData>;

export const useManageFilters = (options: Options) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const isPublicPage = useIsPublicPage();

  const mutation = useMutation<GetNeo4jData, unknown, string[]>({
    mutationFn: (values: string[]) => {
      const type = RequestTypes.Post;

      const urlFilter = isPublicPage ? MANAGE_FILTERS_PUBLIC : MANAGE_FILTERS;

      const url = urlFilter.replace(':project_id', params?.id || '');

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
