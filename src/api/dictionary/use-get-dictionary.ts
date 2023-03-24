import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const GET_DICTIONARY_PROPERTY_TYPES = '/dictionary/property-type';

export const useGetDictionary = (url: string, options = { enabled: true }) => {
  const result = useQuery({ queryKey: [GET_DICTIONARY_PROPERTY_TYPES], queryFn: () => client.get(GET_DICTIONARY_PROPERTY_TYPES), ...options, select: (data) => data.data });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  };
};
