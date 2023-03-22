import { AddType } from 'components/button';
import { ColorFill } from 'components/color-fill';
import { EmptyList } from 'components/empty';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { HeaderActions } from './header-actions';
import { TableSection } from './table-section';
import { TypePropertyProvider } from './table-section/table-context';

export const RightSection = () => {
  const { startAddType, addTypeisOpened, color, titleText, nodeTypeId } = useDataSheetWrapper();

  return (
    <>
      <ColorFill color={color} />
      <AddType
        titleText={titleText}
        onClick={startAddType}
        open={addTypeisOpened}
        onOpenChange={(open) => {
          console.log('open', open);
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
