import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { URL_NODES_LIST } from 'api/node/constants';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

import client from '../client';
import { IMPORT_NODES_URL } from './constants';
import { ImportNodesRequest, ImportNodesResponse } from './types';

type ReturnData = {
  data: ImportNodesResponse;
};

export const useImportNodes = (options?: UseQueryOptions) => {
  const queryClient = useQueryClient();
  const { nodeTypeId } = useDataSheetWrapper();

  const params = useParams();
  const mutation = useMutation<ReturnData, unknown, ImportNodesRequest>({
    mutationFn: (values: ImportNodesRequest) =>
      client.patch(IMPORT_NODES_URL, {
        ...values,
        project_id: params.id,
        project_type_id: nodeTypeId,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([
        URL_NODES_LIST.replace(':project_id', params.id || '').replace(':project_type_id', nodeTypeId || ''),
      ]);

      options?.onSuccess?.(data.data);
    },
    onError: (er) => {
      errorMessage(er);
      options?.onError?.(er);
    },
  });
  return mutation;
};
