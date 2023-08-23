import { RequestType, RequestTypes } from 'api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import client from '../client';
import { errorMessage } from 'helpers/utils';
import { URL_FAVORIES_CREATE, URL_FAVORIES_LIST } from './constants';
import { useParams } from 'react-router-dom';

export const useManageFavorites = (baseUrl = URL_FAVORIES_CREATE, type: RequestType = RequestTypes.Post) => {
  const params = useParams();
  const url = baseUrl.replace(':project_id', params.id as string);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return client[type](url);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_FAVORIES_LIST.replace(':project_id', params.id as string)]);
    },
    onError: errorMessage,
  });
  return mutation;
};
