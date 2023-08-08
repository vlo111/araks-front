import client from 'api/client';
import { RequestTypes } from 'api/types';
import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { errorMessage } from 'helpers/utils';

export const URL_ADD_PERSPECTIVE_TYPE = '/perspectives/add-node-type';
export const URL_REMOVE_PERSPECTIVE_TYPE = '/perspectives/remove-node-type';

export type ReturnPerspectiveTypeData = {
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
  data: ReturnPerspectiveTypeData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnPerspectiveTypeData>;

export const useAddPerspectiveType = (options?: Options) => {
  const params = useParams();

  const mutation = useMutation<ReturnPerspectiveTypeData, unknown, RequestData>({
    mutationFn: ({ type_id }: RequestData) => {
      return client[RequestTypes.Post](URL_ADD_PERSPECTIVE_TYPE, { project_id: params?.id, type_id });
    },
    onSuccess: (data) => options?.onSuccess?.(data),
    onError: errorMessage,
  });
  return mutation;
};
