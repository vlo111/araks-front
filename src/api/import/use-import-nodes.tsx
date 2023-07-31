import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { URL_GET_PROJECT_ALL_DATA } from 'api/all-data/constants';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

import client from '../client';
import { IMPORT_NODES_URL } from './constants';
import { ImportNodesRequest } from './types';

export const useImportNodes = (options?: UseQueryOptions) => {
  const queryClient = useQueryClient();
  const { nodeTypeId } = useDataSheetWrapper();

  const params = useParams();
  const mutation = useMutation({
    mutationFn: (values: ImportNodesRequest) =>
      client.patch(IMPORT_NODES_URL, {
        ...values,
        project_id: params.id,
        project_type_id: nodeTypeId,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([URL_GET_PROJECT_ALL_DATA.replace(':project_id', params.id || '')]);

      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
