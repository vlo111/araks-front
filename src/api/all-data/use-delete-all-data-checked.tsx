import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

import client from '../client';
import { URL_DELETE_PROJECT_ALL_DATA_CHECKED, URL_GET_PROJECT_ALL_DATA } from './constants';

export const useDeleteAllDataChecked = (checkedIds: string[], options?: UseQueryOptions) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const mutation = useMutation({
    mutationFn: () =>
      client.delete(URL_DELETE_PROJECT_ALL_DATA_CHECKED.replace(':project_id', params.id || ''), {
        data: { ids: checkedIds },
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_GET_PROJECT_ALL_DATA.replace(':project_id', params.id || '')]);

      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
