import { Skeleton } from 'antd';
import { UserProjectRole } from 'api/types';
import { AddType } from 'components/button';
import { ColorFill } from 'components/color-fill';
import { ALL_DATA_SORT_BY } from 'components/dropdown/constants';
import { EmptyList } from 'components/empty';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { ViewDatasheetEdgeProvider } from 'context/datasheet-edge-view-vontext';
import { useProject } from 'context/project-context';
import { SortProvider } from 'context/sort-context';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { ConnectionTableSection } from './connection-table';
import { HeaderActions } from './header-actions';
import { RightSectionAllData } from './right-section-all-data';
import { TableSection } from './table-section';

export const RightSection = () => {
  const { projectInfo } = useProject();
  const isPublicPage = useIsPublicPage();

  const {
    startAddType,
    addTypeisOpened,
    color,
    titleText,
    nodeTypeId,
    selectNodeTypeFinished,
    isConnectionType,
    allTypeSelected,
  } = useDataSheetWrapper();

  if (!selectNodeTypeFinished) {
    return <Skeleton />;
  }

  if (allTypeSelected) {
    return (
      <SortProvider defaultValue={ALL_DATA_SORT_BY[2].key}>
        <RightSectionAllData />
      </SortProvider>
    );
  }

  return (
    <>
      <ColorFill color={color} />
      {projectInfo?.role !== UserProjectRole.Viewer && !isPublicPage && (
        <AddType
          titleText={titleText}
          onClick={startAddType}
          open={addTypeisOpened}
          onOpenChange={(open) => {
            // addTypeisOpened && !open && finishAddType();
            return open;
          }}
        >
          <HeaderActions />
        </AddType>
      )}
      {!nodeTypeId && <EmptyList />}
      {nodeTypeId && (
        <>
          {isConnectionType ? (
            <ViewDatasheetEdgeProvider>
              <ConnectionTableSection />
            </ViewDatasheetEdgeProvider>
          ) : (
            <TableSection />
          )}
        </>
      )}
    </>
  );
};
