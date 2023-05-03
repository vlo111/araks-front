import { AddConnectionTypeProprty } from 'components/popover/add-connection-type-property';
import { useMemo } from 'react';
import { useTypeProperty } from '../table-section/table-context';

export const useActions = () => {
  const {
    state: { addConnectionTypeisOpened },
  } = useTypeProperty();

  return useMemo(
    () => [
      ...(addConnectionTypeisOpened
        ? [
            {
              title: <AddConnectionTypeProprty />,
              key: 'operation',
              dataIndex: 'key',
              width: 200,
              className: 'action-class',
              render: () => '',
              flex: 'right',
            },
          ]
        : []),
      {
        key: 'space',
        // flex: 'right',
        dataIndex: 'space',
      },
    ],
    [addConnectionTypeisOpened]
  );
};
