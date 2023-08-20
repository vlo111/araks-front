import { StyledColorBox, StyledInnerCircle } from './styles';

type Props = {
  color: string
}

export const CircleColor = ({color}: Props) => {

  return (
      <StyledColorBox>
        <StyledInnerCircle color={color} />
      </StyledColorBox>
  );
};
