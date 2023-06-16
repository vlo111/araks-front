import { Skeleton } from 'antd';
import { AddType } from 'components/button';
import { ColorFill } from 'components/color-fill';
import { EmptyList } from 'components/empty';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { ConnectionTableSection } from './connection-table';
import { HeaderActions } from './header-actions';
import { RightSectionAllData } from './right-section-all-data';
import { TableSection } from './table-section';

export const RightSection = () => {
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
    return <RightSectionAllData />;
  }

  return (
    <>
      <ColorFill color={color} />
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
      {!nodeTypeId && <EmptyList />}
      {nodeTypeId && <>{isConnectionType ? <ConnectionTableSection /> : <TableSection />}</>}
    </>
  );
};
