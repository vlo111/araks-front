import { useState } from 'react';

import { ConnectionHeader } from '../connection-types/connection-header';
import { NodesHeader } from '../nodes-header';
import { TableStyleBasedOnTab } from '../../types';
import { NodeTypesQueries } from './node-types-queries';
import { ConnectionTypesQueries } from './connection-types-quieries';
import { QueriesSiderCollapse } from 'components/collapse/queries-sider-collapse';

type Props = TableStyleBasedOnTab & {
  setOpenTable: (openTable: boolean) => void;
  add?: () => void;
  fieldsLength?: number;
  isVisualisation?:boolean;
};

export const TabTablesQueries = ({ isCheckable = false, noColors = false, setOpenTable, add, fieldsLength,isVisualisation }: Props) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchConnectionVisible, setSearchConnectionVisible] = useState(false);

  return (
    <QueriesSiderCollapse
      defaultActiveKey="1"
      panels={[
        {
          header: <NodesHeader setSearchVisible={setSearchVisible} />,
          key: '1',
          children: (
            <NodeTypesQueries
              isCheckable={isCheckable}
              noColors={noColors}
              setSearchVisible={setSearchVisible}
              searchVisible={searchVisible}
              setOpenTable={setOpenTable}
              isVisualisation={isVisualisation}
              // add={add}
              // fieldsLength={fieldsLength}
            />
          ),
        },
        {
          header: <ConnectionHeader setSearchVisible={setSearchConnectionVisible} />,
          key: '2',
          children: (
            <ConnectionTypesQueries
              isCheckable={isCheckable}
              noColors={noColors}
              setSearchVisible={setSearchConnectionVisible}
              searchVisible={searchConnectionVisible}
              setOpenTable={setOpenTable}
              // add={add}
              // fieldsLength={fieldsLength}
            />
          ),
        },
      ]}
    />
  );
};
