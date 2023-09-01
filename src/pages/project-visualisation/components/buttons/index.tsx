import { Form } from 'antd';
import { PlusAction } from 'components/actions/plus';
import { StyledButtonsWrapper, StyledAddButton, StyledDiv, StyledCleanButton, StyledRunButton } from './styles';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { AllDataResponse } from 'types/node';
import { ProjectEdgeResponse } from 'types/project-edge';

type Props = {
  setOpenTable: (value: boolean) => void;
  filteredNodes: AllDataResponse[];
  filteredEdges: ProjectEdgeResponse[];
  resetFields: () => void;
};

export const Buttons = ({ setOpenTable, filteredNodes, resetFields, filteredEdges }: Props) => {
  const form = Form.useFormInstance();
  const queries = Form.useWatch('queries', form);
  const { graph } = useGraph() || {};
  const isAddButtonDisabled = queries?.length >= 16;

  const handleClick = () => {
    setOpenTable(true);
  };

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
    filteredEdges.forEach((edge) => {
      graph.updateItem(edge.id as string, {
        style: {
          stroke: '#C3C3C3',
          lineWidth: 2,
          lineDash: [],
        },
      });
    });
    resetFields();
  };

  return (
    <>
      <StyledButtonsWrapper>
        <StyledAddButton onClick={handleClick} disabled={isAddButtonDisabled}>
          <PlusAction /> Add
        </StyledAddButton>
        <StyledDiv>
          <StyledCleanButton htmlType="submit" onClick={removeGraphStyle}>
            Clean All
          </StyledCleanButton>
          <StyledRunButton htmlType="submit">Run</StyledRunButton>
        </StyledDiv>
      </StyledButtonsWrapper>
    </>
  );
};
