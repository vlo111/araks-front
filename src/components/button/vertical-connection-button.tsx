import { useCallback, useEffect, useState } from 'react';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { PlusAction } from 'components/actions/plus';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { AddNodeTypePopover } from 'components/popover';
import { AddConnectionTypePropertyForm } from 'components/form/add-connection-type-property-form';
import { VerticalButtonWrapper } from './vertical-button-wrapper';
import { UserProjectRole } from 'api/types';
import { useProject } from 'context/project-context';

type Props = {
  columnWidth?: number;
  type?: TypePropertyActionKind;
};

export const VerticalConnectionButton = ({ columnWidth, type = TypePropertyActionKind.ADD_TYPE_START }: Props) => {
  const { projectInfo } = useProject();

  const [dataSheetTableSize, setDataSheetTableSize] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  useEffect(() => {
    setDataSheetTableSize(document.querySelectorAll('#datasheet-data')?.[0]?.clientWidth ?? 0);
  }, []);

  if (projectInfo?.role !== UserProjectRole.Owner) {
    return <></>;
  }

  return (
    <AddNodeTypePopover
      content={<AddConnectionTypePropertyForm hide={hide} />}
      open={open}
      trigger="click"
      align={{ offset: [0, -650] }}
      onOpenChange={handleOpenChange}
    >
      <VerticalButtonWrapper
        rowsCount={columnWidth || 1}
        onClick={() => setOpen(true)}
        dataSheetTableSize={dataSheetTableSize}
        wrapperWidth={open ? 200 : undefined}
      >
        {open ? (
          <Text>New Property</Text>
        ) : (
          <PlusAction
            onCustomClick={() => {
              setOpen(true);
            }}
          />
        )}

        <Text className="property-text" color={COLORS.PRIMARY.BLUE}>
          Add Property
        </Text>
      </VerticalButtonWrapper>
    </AddNodeTypePopover>
  );
};
