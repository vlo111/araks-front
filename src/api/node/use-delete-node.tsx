import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { URL_GET_PROJECT_ALL_DATA } from 'api/all-data/constants';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

import client from '../client';
import { URL_DELETE_NODE, URL_NODES_LIST } from './constants';

export const useDeleteNode = (nodeId: string, options?: UseQueryOptions) => {
  const { nodeTypeId } = useDataSheetWrapper();

  const queryClient = useQueryClient();
  const params = useParams();
  const mutation = useMutation({
    mutationFn: () => client.delete(URL_DELETE_NODE.replace(':id', nodeId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([
        URL_NODES_LIST.replace(':project_type_id', nodeTypeId || '').replace(':project_id', params.id || ''),
      ]);
      queryClient.invalidateQueries([URL_GET_PROJECT_ALL_DATA.replace(':project_id', params.id || '')]);

      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
