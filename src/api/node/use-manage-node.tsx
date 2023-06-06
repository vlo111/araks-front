import { RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { URL_CREATE_NODE, URL_NODES_LIST, URL_UPDATE_NODE } from './constants';
import { NodeDataResponse, NodeDataSubmit } from 'types/node';
import { errorMessage } from 'helpers/utils';

export type MoveProjectToAllFormData = {
  projectId: string;
};

type ReturnData = {
  data: NodeDataResponse;
};

type Options = UseQueryOptions<NodeDataSubmit, Error, ReturnData>;

export const useManageNodes = (options?: Options) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, unknown, NodeDataSubmit>({
    mutationFn: (values: NodeDataSubmit) => {
      const url = values.nodeId ? URL_UPDATE_NODE.replace(':id', values.nodeId || '') : URL_CREATE_NODE;
      const type = values.nodeId ? RequestTypes.Put : RequestTypes.Post;
      const body = {
        ...values,
        project_id: params.id,
      };
      return client[type](url, body);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([
        URL_NODES_LIST.replace(':project_type_id', data.data.project_type_id || '').replace(
          ':project_id',
          params.id || ''
        ),
      ]);
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
