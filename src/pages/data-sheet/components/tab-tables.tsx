import { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { SiderCollapse } from 'components/collapse/sider-collapse';
import { ConnectionTypes } from './connection-types';
import { ConnectionHeader } from './connection-types/connection-header';
import { NodeTypes } from './node-types';
import { NodesHeader } from './nodes-header';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useTypeProperty } from './table-section/table-context';
import { TypePropertyActionKind } from './table-section/types';

export const TabTables = () => {
  const { startAddType } = useDataSheetWrapper();
  const { dispatch } = useTypeProperty();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchConnectionVisible, setSearchConnectionVisible] = useState(false);

  const handlePropertyAddClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.ADD_TYPE_START, payload: { isConnectionType: true } });
  }, [dispatch]);

  const handleExtraClick = (event: React.MouseEvent<HTMLElement>, action: () => void) => {
    event.stopPropagation();
    action();
  };

  return (
    <SiderCollapse
      defaultActiveKey="1"
      panels={[
        {
          header: <NodesHeader setSearchVisible={setSearchVisible} />,
          key: '1',
          children: <NodeTypes setSearchVisible={setSearchVisible} searchVisible={searchVisible} />,
          extra: (
            <PlusOutlined style={{ cursor: 'pointer' }} onClick={(event) => handleExtraClick(event, startAddType)} />
          ),
        },
        {
          header: <ConnectionHeader setSearchVisible={setSearchConnectionVisible} />,
          key: '2',
          children: (
            <ConnectionTypes setSearchVisible={setSearchConnectionVisible} searchVisible={searchConnectionVisible} />
          ),
          extra: (
            <PlusOutlined
              style={{ cursor: 'pointer' }}
              onClick={(event) => handleExtraClick(event, handlePropertyAddClick)}
            />
          ),
        },
      ]}
    />
  );
};
