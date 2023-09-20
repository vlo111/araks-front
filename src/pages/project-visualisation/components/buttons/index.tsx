import { Form } from 'antd';
import { PlusAction } from 'components/actions/plus';
import { StyledButtonsWrapper, StyledAddButton, StyledDiv, StyledCleanButton, StyledRunButton } from './styles';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import G6, { IEdge, INode } from '@antv/g6';

type Props = {
  setOpenTable: (value: boolean) => void;
  filteredEdges: IEdge[];
  filteredNodes: INode[];
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
      graph.updateItem(node.getID(), {
        size: 40,
        icon: {
          show: false,
          img: node.getModel()?.img ? node.getModel()?.img : '',
        },
        type: node.getModel()?.img ? 'image' : 'circle',
        style: {
          stroke: node.getModel()?.color as string,
          fill: node.getModel()?.img ? 'transparent' : 'white',
        },
      });
    });
    filteredEdges.forEach((edge) => {
      graph.updateItem(edge.getID() as string, {
        style: {
          stroke: '#C3C3C3',
          lineWidth: 2,
          lineDash: [],
          endArrow: {
            fill: '#C3C3C3',
            path: G6.Arrow.triangle(10, 15, 5),
            d: 5,
          },
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
          <StyledRunButton htmlType="submit" onClick={form.submit}>
            Run
          </StyledRunButton>
        </StyledDiv>
      </StyledButtonsWrapper>
    </>
  );
};
