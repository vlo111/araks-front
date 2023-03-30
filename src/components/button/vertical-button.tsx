import styled, { css } from 'styled-components';
import { Button, ButtonProps } from 'antd';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { useCallback } from 'react';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { PlusAction } from 'components/actions/plus';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';

type WrapperProps = ButtonProps & {
  rowsCount: number;
};

const LeftSidebarSize = 350;

export const Wrapper = styled(({ rowsCount, ...props }: WrapperProps) => <Button {...props} />)`
  height: 712px;
  width: 64px;
  z-index: 4;
  position: absolute;
  ${(props) =>
    props.rowsCount * 300 > screen.width - LeftSidebarSize
      ? css`
      right 0;
    `
      : css`
          left: ${props.rowsCount * 200}px;
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

export const VerticalButton = () => {
  const { nodeTypeId } = useDataSheetWrapper();
  const { data } = useGetProjectNodeTypeProperties(nodeTypeId, { enabled: !!nodeTypeId });
  const {
    dispatch,
    state: { addTypeisOpened },
  } = useTypeProperty();
  const handlePropertyAddClick = useCallback(() => {
    dispatch({ type: TypePropertyActionKind.ADD_TYPE_START, payload: {} });
  }, [dispatch]);

  return !addTypeisOpened ? (
    <Wrapper onClick={handlePropertyAddClick} rowsCount={data?.length || 1}>
      <PlusAction />
      <Text className="property-text" color={COLORS.PRIMARY.BLUE}>
        Add Property
      </Text>
    </Wrapper>
  ) : (
    <></>
  );
};
