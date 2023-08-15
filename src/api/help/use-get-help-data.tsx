import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AllDataHelp } from 'types/node';
import client from '../client';
import { HelpNodeType } from '../../pages/sign-in/components/type';

type ReturnData = {
  data: AllDataHelp[];
};

export const URL_GET_HELP = '/helps-node/';

type Options = UseQueryOptions<ReturnData, Error, AllDataHelp[]>;
type Result = UseQueryResult<AllDataHelp[] | AllDataHelp | HelpNodeType>;

export const useGetHelp = (id?: string, options?: Options): Result => {
  let url = URL_GET_HELP;
  if (id) url += id;
  const result = useQuery({
    queryKey: [],
    queryFn: () => client.get(url).then((data) => data.data),
    ...options,
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: (isSuccess ? data : {}) as AllDataHelp[] | AllDataHelp | HelpNodeType,
  } as Result;
};
