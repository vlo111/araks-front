import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { errorMessage } from 'helpers/utils';
import { useParams } from 'react-router-dom';

import client from '../client';
import { URL_EDGES_NODE_DATA } from './constants';

export const useDeleteEdge = (nodeId: string, options?: UseQueryOptions) => {
  const { nodeTypeId } = useDataSheetWrapper();

  const queryClient = useQueryClient();
  const params = useParams();
  const mutation = useMutation({
    // :TODO replace this with DELETE endpoint url
    mutationFn: () => client.delete(URL_EDGES_NODE_DATA.replace(':id', nodeId)),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([
        URL_EDGES_NODE_DATA.replace(':edge_type_id', nodeTypeId || '').replace(':project_id', params.id || ''),
      ]);

      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
