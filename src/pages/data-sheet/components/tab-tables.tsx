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
import { UserProjectRole } from 'api/types';
import { useProject } from 'context/project-context';
import { useIsPublicPage } from 'hooks/use-is-public-page';

export const TabTables = ({ isCheckable = false, noColors = false, hideConnection = false }: TableStyleBasedOnTab) => {
  const { startAddType, allTypeSelected } = useDataSheetWrapper();
  const { projectInfo } = useProject();
  const isPublicPage = useIsPublicPage();

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchConnectionVisible, setSearchConnectionVisible] = useState(false);

  const handleExtraClick = (event: React.MouseEvent<HTMLElement>, action: () => void) => {
    event.stopPropagation();
    action();
  };

  return (
    <SiderCollapse
      defaultActiveKey="1"
      height={!isCheckable ? '32vh' : 'auto'}
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
          extra: !allTypeSelected && projectInfo?.role === UserProjectRole.Owner && !isPublicPage && (
            <AddAction onClick={(event) => handleExtraClick(event, startAddType)} helpText="Add Type" />
          ),
        },
        ...(!hideConnection
          ? [
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
                extra: !allTypeSelected && projectInfo?.role === UserProjectRole.Owner && !isPublicPage && (
                  <AddNewConnection />
                ),
              },
            ]
          : []),
      ]}
    />
  );
};
