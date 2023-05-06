import { useMemo } from 'react';

export const useActions = () => {
  return useMemo(
    () => [
      {
        key: 'space',
        dataIndex: 'space',
      },
    ],
    []
  );
};
