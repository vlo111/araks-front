import { useMutation, UseQueryOptions } from '@tanstack/react-query';
import { UserData } from 'api/types';
import { errorMessage } from 'helpers/utils';
import client from '../client';
import { URL_USERS_SEARCH } from './constants';
import { MentionMutation } from './types';

type UsersSearchResponseData = {
  count: number;
  rows: UserData[];
};

export type Nodes = UserData[];

type ReturnData = {
  data: UsersSearchResponseData;
};

type Options = UseQueryOptions<ReturnData[], Error, UsersSearchResponseData>;

const req_param = {
  page: 1,
  size: 100,
  search: '',
};

export const useGetUserSearch = (searchValue?: string, options?: Options) => {
  const urlNodes = URL_USERS_SEARCH;

  return useMutation<ReturnData, unknown, MentionMutation>({
    mutationFn: (values: MentionMutation) => client.get(urlNodes, { params: { ...req_param, ...values } }),
    onError: errorMessage,
  });
};
