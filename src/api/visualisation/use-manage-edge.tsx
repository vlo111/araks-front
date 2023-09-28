import { RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { errorMessage } from 'helpers/utils';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { EdgesCreate } from 'types/edges';
import { URL_CREATE_EDGE, URL_EDGES_NODE_DATA, URL_UPDATE_EDGE } from '../edges/constants';

type requestData = {
  source_id: string | undefined;
  target_id: string | undefined;
  properties: { id: string; edge_type_property_id: string; edge_type_property_type: string; data: unknown[] }[];
  id: string | undefined;
};

export type MoveProjectToAllFormData = {
  projectId: string;
};

type ReturnData = unknown;

type Options = UseQueryOptions<EdgesCreate, Error, ReturnData>;

export const useManageEdgeGraph = (options?: Options) => {
  const { nodeTypeId } = useDataSheetWrapper();

  const params = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, unknown, requestData>({
    mutationFn: ({ id, ...values }) => {
      const url = id ? URL_UPDATE_EDGE.replace(':id', id || '') : URL_CREATE_EDGE;
      const type = id ? RequestTypes.Put : RequestTypes.Post;
      const body = {
        ...values,
        project_id: params.id,
      };
      return client[type](url, body);
    },
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
