import client from 'api/client';
import { IResponsePerspectiveData, RequestTypes } from "api/types";
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { errorMessage } from 'helpers/utils';
import { GET_PERSPECTIVES_DATA } from './use-get-perspectives';

const URL_PERSPECTIVE_CREATE = '/perspectives/create';
const URL_PERSPECTIVE_UPDATE = '/perspectives/update/:id';

type ReturnData = {
  data: IResponsePerspectiveData;
};

type RequestData = {
  title: string;
  description: string;
  project_id?: string;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;

export const useCreatePerspective = (options: Options, id?: string) => {
  const params = useParams();

  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, unknown, RequestData>({
    mutationFn: ({ ...values }: RequestData) => {
      const url = id ? URL_PERSPECTIVE_UPDATE.replace(':id', id || '') : URL_PERSPECTIVE_CREATE;
      const type = id ? RequestTypes.Put : RequestTypes.Post;
      const body = id ? { ...values } : { ...values, project_id: params.id };
      return client[type](url, body);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_PERSPECTIVES_DATA.replace(':project_id', params?.id || '')]);
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
