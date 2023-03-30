import styled from 'styled-components';
import { Button } from 'antd';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { useCallback } from 'react';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { PlusAction } from 'components/actions/plus';

export const Wrapper = styled(Button)`
  /* transform: rotate(-90deg); */
  height: 80%; //calculate rows count and height
  width: 64px;
  /* height: 64px;
  width: 100%; */
  z-index: 4;
  position: absolute;
  left: 200px; //variable
  background: linear-gradient(179.75deg, rgba(213, 215, 223, 0.9) 0%, rgba(213, 215, 223, 0.3) 99.91%);
  backdrop-filter: blur(2px);
  border: none;
  border-radius: 0;
  display: flex;
  justify-content: center;
  padding-top: 30px;

  &:hover {
    background: linear-gradient(179.75deg, #bec4db 0%, rgba(192, 198, 219, 0.3) 99.91%);
  }
`;

export const VerticalButton = () => {
  const {
    dispatch,
    state: { addTypeisOpened },
  } = useTypeProperty();
  const handlePropertyAddClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.ADD_TYPE_START, payload: {} });
  }, [dispatch]);

  return !addTypeisOpened ? (
    <Wrapper onClick={handlePropertyAddClick}>
      <PlusAction />
    </Wrapper>
  ) : (
    <></>
  );
};
