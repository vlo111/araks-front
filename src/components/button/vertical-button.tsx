import styled, { css } from 'styled-components';
import { Button, ButtonProps } from 'antd';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { useCallback } from 'react';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { PlusAction } from 'components/actions/plus';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';

type WrapperProps = ButtonProps & {
  rowsCount: number;
};

const dataSheetSectionSize = document.querySelectorAll('#datasheet-data')?.[0]?.clientWidth;

export const Wrapper = styled(({ rowsCount, ...props }: WrapperProps) => <Button {...props} />)`
  height: 100%;
  width: 64px;
  z-index: 5;
  position: absolute;
  ${(props) =>
    props.rowsCount > dataSheetSectionSize - 40
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
};

export const VerticalButton = ({ columnWidth }: Props) => {
  const {
    dispatch,
    state: { addTypeisOpened },
  } = useTypeProperty();
  const handlePropertyAddClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.ADD_TYPE_START, payload: {} });
  }, [dispatch]);

  return !addTypeisOpened ? (
    <Wrapper onClick={handlePropertyAddClick} rowsCount={columnWidth || 1}>
      <PlusAction />
      <Text className="property-text" color={COLORS.PRIMARY.BLUE}>
        Add Property
      </Text>
    </Wrapper>
  ) : (
    <></>
  );
};
