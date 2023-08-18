import { PlusAction } from 'components/actions/plus';
import { StyledButtonsWrapper, StyledAddButton, StyledDiv, StyledCleanButton, StyledRunButton } from './styles';
import {  useState } from 'react';


type Props =  {
  setOpenTable: (value: boolean) => void;
}

export const Buttons = ({setOpenTable}: Props) => {
  const [creationCount, setCreationCount] = useState(0)


const handleClick = () => {
    setOpenTable(true)
  setCreationCount(creationCount + 1)
}

const isDisabled = creationCount >= 24;


  return (
    <>
      <StyledButtonsWrapper>
        <StyledAddButton onClick={handleClick} disabled={isDisabled}>
          <PlusAction /> Add
        </StyledAddButton>
        <StyledDiv>
          <StyledCleanButton>Clean All</StyledCleanButton>
          <StyledRunButton htmlType="submit">Run</StyledRunButton>
        </StyledDiv>
      </StyledButtonsWrapper>
    </>
  );
};
