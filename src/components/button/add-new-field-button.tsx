import { ButtonProps } from 'antd';
import { SecondaryText } from 'components/typography';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { Button } from '.';

const StyledButton = styled(Button)`
  padding: 0;
  height: auto;
  border: 0;

  span {
    text-decoration: underline;
    font-weight: 600;
  }
`;

export const AddNewFieldButton = (props: ButtonProps) => {
  return (
    <StyledButton type="link" {...props}>
      <SecondaryText color={props.disabled ? COLORS.PRIMARY.SILVER : COLORS.PRIMARY.BLUE}>+ Add</SecondaryText>
    </StyledButton>
  );
};
