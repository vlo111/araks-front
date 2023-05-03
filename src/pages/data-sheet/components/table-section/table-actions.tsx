import { ColumnsType } from 'antd/es/table';

import { DataType } from './types';

import { useTypeProperty } from './table-context';
import { AddTypeProprty } from 'components/button/add-type-property';
import { useMemo } from 'react';

export const useActions = () => {
  const {
    state: { addTypeisOpened },
  } = useTypeProperty();

  return useMemo(
    () =>
      [
        ...(addTypeisOpened
          ? [
              {
                title: <AddTypeProprty />,
                key: 'operation',
                fixed: 'right',
                dataIndex: 'key',
                width: 200,
                className: 'action-class',
                render: () => '',
                align: 'center',
              },
            ]
          : []),
        {
          key: 'space',
          // fixed: 'right',
          dataIndex: 'space',
        },
      ] as ColumnsType<DataType>,
    [addTypeisOpened]
  );
};
