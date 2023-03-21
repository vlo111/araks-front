
import { useQuery } from '@tanstack/react-query';
import client from '../client';

export const GET_DICTIONARY_PROPERTY_TYPES = '/dictionary/get-property-type';

const useGetDictionary = (url: string, options = { enabled: true }) => {
  const result = useQuery([GET_DICTIONARY_PROPERTY_TYPES], () => client.get(GET_DICTIONARY_PROPERTY_TYPES), {
    ...options,
    select: (data) => data.data,
  });
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data.data : [],
  };
};

export default useGetDictionary;
