import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../../client';
import { USE_GET_ALL_MEMBERS } from './use-get-all-members';
import { errorMessage } from '../../../helpers/utils';
import { message } from 'antd';
import { useParams } from 'react-router-dom';

export const MEMBERS_DELETE_URL = 'perspectives/delete-user/:id';

export const useDeleteMember = (pagination: { page: number; size: number; search: string }) => {
  const params = useParams();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, perspective_user_id }: { id: string; perspective_user_id: string }) =>
      client.delete(MEMBERS_DELETE_URL.replace(':id', id), { data: { perspective_user_id } }),
    onSuccess: () => {
      const url = USE_GET_ALL_MEMBERS.replace(':project_id', params.id || '');

      queryClient.invalidateQueries([url, pagination]);

      message.success('Member deleted successfully');
    },
    onError: errorMessage,
  });
  return mutation;
};
