import { RequestTypes } from 'api/types';
import { useMutation } from '@tanstack/react-query';

import client from '../../client';

export type UpdatePosition = {
  fx: string;
  fy: string;
}

export const TYPE_POSITION_UPDATE_URL = 'projects-node-types/:id/update-position';

export const TYPE_POSITION_URL = `${process.env.REACT_APP_BASE_URL}${TYPE_POSITION_UPDATE_URL}`;

export const useUpdatePosition = (typeId: string) => {
  const mutation = useMutation({ mutationFn: (positions: UpdatePosition) => {
      return client[RequestTypes.Put](TYPE_POSITION_UPDATE_URL.replace(':id', typeId), {
        ...positions
      });
    }});
  return mutation;
};
