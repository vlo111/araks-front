import { RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import client from '../client';
import { URL_CREATE_NODE, URL_NODES_LIST, URL_UPDATE_NODE } from './constants';
import { NodeDataSubmit, NodePropertiesValues } from 'types/node';
import { errorMessage } from 'helpers/utils';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { URL_GET_PROJECT_ALL_DATA, URL_GET_PROJECT_ALL_DOCUMENTS } from 'api/all-data/constants';

export type MoveProjectToAllFormData = {
  projectId: string;
};

type ReturnData = {
  data: NodePropertiesValues;
};

type Options = UseQueryOptions<NodeDataSubmit, Error, ReturnData>;

export const useManageNodes = (options?: Options) => {
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

      setTimeout(() => {
        queryClient.invalidateQueries([URL_GET_PROJECT_ALL_DOCUMENTS.replace(':project_id', params.id || '')]);
      }, 500);

      queryClient.invalidateQueries([URL_GET_PROJECT_ALL_DATA.replace(':project_id', params.id || '')]);
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
