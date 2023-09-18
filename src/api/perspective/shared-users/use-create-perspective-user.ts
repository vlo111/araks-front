import client from 'api/client';
import { IResponsePerspectiveData, RequestTypes } from 'api/types';
import { useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { errorMessage } from 'helpers/utils';
import { GET_PERSPECTIVES_USERS } from './use-get-perspecive-users';
import { GET_PERSPECTIVES_DATA } from '../use-get-perspectives';
import { GET_PERSPECTIVE } from '../use-get-perspective';
import { USE_GET_ALL_MEMBERS } from './use-get-all-members';

const URL_PERSPECTIVE_USER_CREATE = '/perspectives/add-user/:project_id';
const URL_PERSPECTIVE_USER_UPDATE = '/perspectives/change-role/:id';

type ReturnData = {
  data: IResponsePerspectiveData;
};

type RequestData = {
  role: string;
  email?: string;
  perspective_id?: string;
  perspective_user_id?: string;
};

type QueryResponse = {
  data: ReturnData;
};

type Options = UseQueryOptions<QueryResponse, Error, ReturnData>;

export const useCreatePerspectiveUser = (options: Options, id?: string) => {
  const params = useParams();

  const queryClient = useQueryClient();

  const mutation = useMutation<ReturnData, unknown, RequestData>({
    mutationFn: ({ ...values }: RequestData) => {
      const isEdit = !values.perspective_id;
      const url = isEdit
        ? URL_PERSPECTIVE_USER_UPDATE.replace(':id', id ?? '')
        : URL_PERSPECTIVE_USER_CREATE.replace(':project_id', params?.id ?? '');
      const type = isEdit ? RequestTypes.Put : RequestTypes.Post;
      return client[type](url, values);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([GET_PERSPECTIVES_USERS.replace(':perspectiveId', id || '')]);
      queryClient.invalidateQueries([GET_PERSPECTIVES_DATA.replace(':project_id', params?.id || '')]);
      queryClient.invalidateQueries([GET_PERSPECTIVE.replace(':id', id || '')]);
      queryClient.invalidateQueries([
        USE_GET_ALL_MEMBERS.replace(':project_id', params.id || ''),
        { page: 1, size: 10, search: '' },
      ]);
      options?.onSuccess?.(data);
    },
    onError: errorMessage,
  });
  return mutation;
};
