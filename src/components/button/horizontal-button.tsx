import styled from 'styled-components';
import { Button, ButtonProps } from 'antd';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { useCallback } from 'react';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { PlusAction } from 'components/actions/plus';
import { getTableHeadHeight } from 'pages/data-sheet/components/table-section/constants';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';

type WrapperProps = ButtonProps & {
  rowsCount: number;
};

export const Wrapper = styled(({ rowsCount, ...props }: WrapperProps) => <Button {...props} />)`
  width: 100%;
  height: 64px;
  z-index: 4;
  position: absolute;
  top: ${getTableHeadHeight}px; //should depend on rowscount of grid: ;
  background: linear-gradient(179.75deg, rgba(213, 215, 223, 0.9) 0%, rgba(213, 215, 223, 0.3) 99.91%);
  backdrop-filter: blur(2px);
  border: none;
  border-radius: 0;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  .property-text {
    display: none;
  }

  &:hover {
    background: linear-gradient(179.75deg, #bec4db 0%, rgba(192, 198, 219, 0.3) 99.91%);

    .property-text {
      display: inline;
    }
  }
`;

export const HorizontalButton = () => {
  const {
    dispatch,
    state: { addTypeisOpened },
  } = useTypeProperty();
  const handlePropertyAddClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.ADD_TYPE_START, payload: {} });
  }, [dispatch]);

  return !addTypeisOpened ? (
    <Wrapper onClick={handlePropertyAddClick} rowsCount={0}>
      <PlusAction />
      <Text className="property-text" color={COLORS.PRIMARY.BLUE}>
        Add Node
      </Text>
    </Wrapper>
  ) : (
    <></>
  );
};
