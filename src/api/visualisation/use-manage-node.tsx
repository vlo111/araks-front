import { RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { NodeDataSubmit, NodePropertiesValues } from 'types/node';
import { errorMessage } from 'helpers/utils';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { URL_CREATE_NODE, URL_NODES_LIST, URL_UPDATE_NODE } from '../node/constants';

export type MoveProjectToAllFormData = {
  projectId: string;
};

type ReturnData = {
  data: NodePropertiesValues;
};

type Options = UseQueryOptions<NodeDataSubmit, Error, { data: NodePropertiesValues; variables: NodeDataSubmit }>;

export const useManageNodesGraph = (options?: Options) => {
  const { nodeTypeId } = useDataSheetWrapper();

  const params = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, unknown, NodeDataSubmit>({
    mutationFn: ({ nodeId, ...values }: NodeDataSubmit) => {
      const url = nodeId ? URL_UPDATE_NODE.replace(':id', nodeId || '') : URL_CREATE_NODE;
      const type = nodeId ? RequestTypes.Put : RequestTypes.Post;
      const body = {
        ...values,
        project_id: params.id,
      };
      return client[type](url, body);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([
        URL_NODES_LIST.replace(':project_type_id', nodeTypeId || '').replace(':project_id', params.id || ''),
      ]);
      options?.onSuccess?.({ data: data.data, variables });
    },
    onError: errorMessage,
  });
  return mutation;
};
