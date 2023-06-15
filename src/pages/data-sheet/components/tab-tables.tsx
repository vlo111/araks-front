import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { SiderCollapse } from 'components/collapse/sider-collapse';
import { ConnectionTypes } from './connection-types';
import { ConnectionHeader } from './connection-types/connection-header';
import { NodeTypes } from './node-types';
import { NodesHeader } from './nodes-header';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
// import { useTypeProperty } from './table-section/table-context';
// import { TypePropertyActionKind } from './table-section/types';
import { AddNewConnection } from './connection-types/add-new-connection';
import { TableStyleBasedOnTab } from '../types';

export const TabTables = ({ isCheckable = false, noColors = false }: TableStyleBasedOnTab) => {
  const { startAddType } = useDataSheetWrapper();
  // const { dispatch } = useTypeProperty();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchConnectionVisible, setSearchConnectionVisible] = useState(false);

  // const handlePropertyAddClick = useCallback(() => {
  //   dispatch({ type: TypePropertyActionKind.ADD_TYPE_START, payload: { isConnectionType: true } });
  // }, [dispatch]);

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
          children: (
            <NodeTypes
              isCheckable={isCheckable}
              noColors={noColors}
              setSearchVisible={setSearchVisible}
              searchVisible={searchVisible}
            />
          ),
          extra: (
            <PlusOutlined style={{ cursor: 'pointer' }} onClick={(event) => handleExtraClick(event, startAddType)} />
          ),
        },
        {
          header: <ConnectionHeader setSearchVisible={setSearchConnectionVisible} />,
          key: '2',
          children: (
            <ConnectionTypes
              isCheckable={isCheckable}
              noColors={noColors}
              setSearchVisible={setSearchConnectionVisible}
              searchVisible={searchConnectionVisible}
            />
          ),
          extra: <AddNewConnection />,
        },
      ]}
    />
  );
};
