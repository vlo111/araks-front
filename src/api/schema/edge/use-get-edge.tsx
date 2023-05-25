import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const GET_FOLDERS_LIST = '/projects-edge-type/:id';

export const useGetEdge = (id?: string) => {
  const result = useQuery({
    queryKey: [GET_FOLDERS_LIST, id],
    queryFn: () => client.get(GET_FOLDERS_LIST.replace(':id', id || '')),
    enabled: !!id
  });
  const { data, isSuccess } = result;

  return {
    ...result,
    data: isSuccess ? data.data : [],
  };
};
