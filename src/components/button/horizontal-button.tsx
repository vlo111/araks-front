import styled from 'styled-components';
import { Button, ButtonProps } from 'antd';
import { useCallback } from 'react';
import { PlusAction } from 'components/actions/plus';
import { Text } from 'components/typography';
import { COLORS, screenSize } from 'helpers/constants';
import { useProject } from 'context/project-context';
import { UserProjectRole } from 'api/types';

type WrapperProps = ButtonProps & {
  position: number;
};

export const Wrapper = styled(({ position, ...props }: WrapperProps) => <Button {...props} />)`
  @media (min-width: ${screenSize.xxl}) {
    height: 64px;
  }
  height: 40px;
  background: #ced2de;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${(props) => `${props.position}px`};
  background: linear-gradient(179.75deg, rgba(213, 215, 223, 0.9) 0%, rgba(213, 215, 223, 0.3) 99.91%);
`;

type Props = {
  tableHead: number;
  openForm: () => void;
  formIsOpened: boolean;
};

export const HorizontalButton = ({ tableHead, openForm, formIsOpened }: Props) => {
  const { projectInfo } = useProject();
  const handlePropertyAddClick = useCallback(() => {
    openForm();
  }, [openForm]);

  return !formIsOpened && projectInfo && projectInfo?.role !== UserProjectRole.Viewer ? (
    <Wrapper onClick={handlePropertyAddClick} position={tableHead + 20}>
      <PlusAction />
      <Text className="property-text" color={COLORS.PRIMARY.BLUE}>
        Add Node
      </Text>
    </Wrapper>
  ) : (
    <></>
  );
};
