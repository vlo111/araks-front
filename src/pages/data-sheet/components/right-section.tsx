import { Skeleton } from 'antd';
import { AddType } from 'components/button';
import { ColorFill } from 'components/color-fill';
import { EmptyList } from 'components/empty';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { HeaderActions } from './header-actions';
import { TableSection } from './table-section';
import { TypePropertyProvider } from './table-section/table-context';

export const RightSection = () => {
  const { startAddType, addTypeisOpened, color, titleText, nodeTypeId, isLoading, selectNodeTypeFinished } =
    useDataSheetWrapper();
  // eslint-disable-next-line no-console
  console.log(nodeTypeId, isLoading, selectNodeTypeFinished);
  if (!selectNodeTypeFinished) {
    return <Skeleton />;
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
      {nodeTypeId && (
        <TypePropertyProvider>
          <TableSection />
        </TypePropertyProvider>
      )}
    </>
  );
};
