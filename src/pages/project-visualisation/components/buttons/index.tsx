import { useState } from 'react';
import { PlusAction } from 'components/actions/plus';
import { StyledButtonsWrapper, StyledAddButton, StyledDiv, StyledCleanButton, StyledRunButton } from './styles';
import { useGraph } from "components/layouts/components/visualisation/wrapper";
import { AllDataResponse } from "types/node";


type Props =  {
  setOpenTable: (value: boolean) => void;
  filteredNodes: AllDataResponse[];
  resetFields: () => void;
}

export const Buttons = ({setOpenTable,filteredNodes,resetFields}: Props) => {
  const [creationCount, setCreationCount] = useState(0)
  const { graph} = useGraph() || {}

  const handleClick = () => {
    setOpenTable(true)
  setCreationCount(creationCount + 1)
}

  const isDisabled = creationCount >= 24;
  const removeGraphStyle = () => {
    filteredNodes.forEach((node) => {
      graph.updateItem(node.id, {
        size: 40,
        icon: {
          show: false,
        },
        style: {
          stroke: node.nodeType.color,
        },
      });
    });
    resetFields();
  };


  return (
    <>
      <StyledButtonsWrapper>
        <StyledAddButton onClick={handleClick} disabled={isDisabled}>
          <PlusAction /> Add
        </StyledAddButton>
        <StyledDiv>
          <StyledCleanButton htmlType="submit" onClick={removeGraphStyle}>Clean All</StyledCleanButton>
          <StyledRunButton htmlType="submit">Run</StyledRunButton>
        </StyledDiv>
      </StyledButtonsWrapper>
    </>
  );
};
