import styled from 'styled-components';
import { Button, ButtonProps } from 'antd';
// import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { useCallback } from 'react';
// import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { PlusAction } from 'components/actions/plus';
import { Text } from 'components/typography';
import { COLORS, screenSize } from 'helpers/constants';

type WrapperProps = ButtonProps & {
  position: number;
};

export const Wrapper = styled(({ position, ...props }: WrapperProps) => <Button {...props} />)`
  width: 100%;
  @media (min-width: ${screenSize.xxl}) {
    height: 64px;
  }
  height: 40px;
  z-index: 4;
  position: absolute;
  top: ${(props) => `${props.position}px`};
  background: linear-gradient(179.75deg, rgba(213, 215, 223, 0.9) 0%, rgba(213, 215, 223, 0.3) 99.91%);
  backdrop-filter: blur(2px);
  border: none;
  border-radius: 0;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 16px;

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

type Props = {
  tableHead: number;
  openForm: () => void;
  formIsOpened: boolean;
};

export const HorizontalButton = ({ tableHead, openForm, formIsOpened }: Props) => {
  // const {
  //   dispatch,
  //   state: { addTypeisOpened },
  // } = useTypeProperty();
  const handlePropertyAddClick = useCallback(() => {
    openForm();
    // dispatch({ type: TypePropertyActionKind.ADD_TYPE_START, payload: {} });
  }, [openForm]);

  return !formIsOpened ? (
    <Wrapper onClick={handlePropertyAddClick} position={tableHead}>
      <PlusAction />
      <Text className="property-text" color={COLORS.PRIMARY.BLUE}>
        Add Node
      </Text>
    </Wrapper>
  ) : (
    <></>
  );
};
