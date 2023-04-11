import styled from 'styled-components';
import { Button, ButtonProps } from 'antd';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { useCallback, useEffect, useState } from 'react';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { PlusAction } from 'components/actions/plus';
import { getTableHeadHeight } from 'pages/data-sheet/components/table-section/constants';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';

type WrapperProps = ButtonProps & {
  position: number;
};

export const Wrapper = styled(({ position, ...props }: WrapperProps) => <Button {...props} />)`
  width: 100%;
  height: 64px;
  z-index: 4;
  position: absolute;
  top: 600px; //should depend on position of grid: ;
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
  const [position, setPosition] = useState(0);
  const {
    dispatch,
    state: { addTypeisOpened },
  } = useTypeProperty();
  const handlePropertyAddClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.ADD_TYPE_START, payload: {} });
  }, [dispatch]);

  useEffect(() => {
    setPosition(getTableHeadHeight());
  }, []);
  // eslint-disable-next-line no-console
  console.log('position', position);

  return !addTypeisOpened ? (
    <Wrapper onClick={handlePropertyAddClick} position={position}>
      <PlusAction />
      <Text className="property-text" color={COLORS.PRIMARY.BLUE}>
        Add Node
      </Text>
    </Wrapper>
  ) : (
    <></>
  );
};
