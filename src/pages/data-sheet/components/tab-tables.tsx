import { useState } from 'react';

import { SiderCollapse } from 'components/collapse/sider-collapse';
import { ConnectionTypes } from './connection-types';
import { ConnectionHeader } from './connection-types/connection-header';
import { NodeTypes } from './node-types';
import { NodesHeader } from './nodes-header';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { AddNewConnection } from './connection-types/add-new-connection';
import { TableStyleBasedOnTab } from '../types';
import { AddAction } from 'components/actions/add';

export const TabTables = ({ isCheckable = false, noColors = false }: TableStyleBasedOnTab) => {
  const { startAddType, allTypeSelected } = useDataSheetWrapper();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchConnectionVisible, setSearchConnectionVisible] = useState(false);

  const handleExtraClick = (event: React.MouseEvent<HTMLElement>, action: () => void) => {
    event.stopPropagation();
    // eslint-disable-next-line no-console
    console.log('Hello');
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
          extra: !allTypeSelected && (
            <AddAction onClick={(event) => handleExtraClick(event, startAddType)} helpText="Add Type" />
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
          extra: !allTypeSelected && <AddNewConnection />,
        },
      ]}
    />
  );
};
