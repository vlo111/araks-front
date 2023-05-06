import { ColumnsType } from 'antd/es/table';

import { DataType } from './types';

import { useMemo } from 'react';

export const useActions = () => {
  return useMemo(
    () =>
      [
        {
          key: 'space',
          dataIndex: 'space',
        },
      ] as ColumnsType<DataType>,
    []
  );
};
