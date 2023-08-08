import client from 'api/client';
import { RequestTypes } from 'api/types';
import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { errorMessage } from 'helpers/utils';

export const URL_ADD_PERSPECTIVE_TYPE = '/perspectives/add-node-type';

type ReturnData = {
  data: {
    id: string;
    perspective_id: string;
    project_id: string;
    project_node_type_id: string;
    user_id: string;
    updated_at: string;
    created_at: string;
  };
};

type RequestData = {
  type_id: string;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;

export const useAddPerspectiveType = (options?: Options) => {
  const params = useParams();

  const mutation = useMutation<ReturnData, unknown, RequestData>({
    mutationFn: ({ type_id }: RequestData) => {
      return client[RequestTypes.Post](URL_ADD_PERSPECTIVE_TYPE, { project_id: params?.id, type_id });
    },
    onSuccess: (data) => options?.onSuccess?.(data),
    onError: errorMessage,
  });
  return mutation;
};
