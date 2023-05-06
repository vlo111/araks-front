import styled, { css } from 'styled-components';
import { Button, ButtonProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { PlusAction } from 'components/actions/plus';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { AddNodeTypePopover } from 'components/popover';
import { AddConnectionTypePropertyForm } from 'components/form/add-connection-type-property-form';

type WrapperProps = ButtonProps & {
  rowsCount: number;
  dataSheetTableSize: number;
  wrapperWidth?: number;
};

export const Wrapper = styled(({ rowsCount, dataSheetTableSize, wrapperWidth, ...props }: WrapperProps) => (
  <Button {...props} />
))`
  height: 100%;
  width: ${({ wrapperWidth }) => wrapperWidth ?? 64}px;
  z-index: 5;
  position: absolute;
  ${(props) =>
    props.rowsCount > props.dataSheetTableSize - 64
      ? css`
      right 0;
    `
      : css`
          left: ${props.rowsCount}px;
        `}

  background: linear-gradient(179.75deg, rgba(213, 215, 223, 0.9) 0%, rgba(213, 215, 223, 0.3) 99.91%);
  backdrop-filter: blur(2px);
  border: none;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 30px;

  .property-text {
    display: none;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  &:hover {
    background: linear-gradient(179.75deg, #bec4db 0%, rgba(192, 198, 219, 0.3) 99.91%);
    .property-text {
      display: inline;
    }
  }
`;

type Props = {
  columnWidth?: number;
  type?: TypePropertyActionKind;
};

export const VerticalConnectionButton = ({ columnWidth, type = TypePropertyActionKind.ADD_TYPE_START }: Props) => {
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

  return (
    <AddNodeTypePopover
      content={<AddConnectionTypePropertyForm hide={hide} />}
      open={open}
      trigger="click"
      align={{ offset: [0, -650] }}
      onOpenChange={handleOpenChange}
    >
      <Wrapper
        rowsCount={columnWidth || 1}
        onClick={() => setOpen(true)}
        dataSheetTableSize={dataSheetTableSize}
        wrapperWidth={open ? 200 : undefined}
      >
        {open ? <Text>New Property</Text> : <PlusAction />}

        <Text className="property-text" color={COLORS.PRIMARY.BLUE}>
          Add Property
        </Text>
      </Wrapper>
    </AddNodeTypePopover>
  );
};
