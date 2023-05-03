import styled, { css } from 'styled-components';
import { Button, ButtonProps } from 'antd';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { useCallback, useEffect, useState } from 'react';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { PlusAction } from 'components/actions/plus';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';

type WrapperProps = ButtonProps & {
  rowsCount: number;
  dataSheetTableSize: number;
};

const dataSheetSectionSize = document.querySelectorAll('#datasheet-data')?.[0]?.clientWidth;

export const Wrapper = styled(({ rowsCount, dataSheetTableSize, ...props }: WrapperProps) => <Button {...props} />)`
  height: 100%;
  width: 64px;
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

export const VerticalButton = ({ columnWidth, type = TypePropertyActionKind.ADD_TYPE_START }: Props) => {
  const [dataSheetTableSize, setDataSheetTableSize] = useState<number>(1);
  const {
    dispatch,
    state: { addTypeisOpened, addConnectionTypeisOpened },
  } = useTypeProperty();
  const handlePropertyAddClick = useCallback(() => {
    dispatch({ type, payload: {} });
  }, [dispatch, type]);

  // eslint-disable-next-line no-console
  console.log(
    'props.rowsCount > dataSheetSectionSize + 64',
    (columnWidth || 1) > dataSheetSectionSize - 64,
    columnWidth ?? 1,
    dataSheetSectionSize,
    dataSheetSectionSize - 64
  );

  useEffect(() => {
    setDataSheetTableSize(document.querySelectorAll('#datasheet-data')?.[0]?.clientWidth ?? 0);
  }, []);

  return !(addTypeisOpened || addConnectionTypeisOpened) ? (
    <Wrapper onClick={handlePropertyAddClick} rowsCount={columnWidth || 1} dataSheetTableSize={dataSheetTableSize}>
      <PlusAction />
      <Text className="property-text" color={COLORS.PRIMARY.BLUE}>
        Add Property
      </Text>
    </Wrapper>
  ) : (
    <></>
  );
};
