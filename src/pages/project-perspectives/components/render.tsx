import styled from 'styled-components';
import { useGraphRef } from 'hooks/use-graph';
import { useNodes } from '../../../hooks/use-nodes';

const Graph = styled.div`
  position: fixed;
  top: 152px;
  z-index: 0;
`;

export const RenderSchema = () => {
  const ref = useGraphRef();

  useNodes();

  return <Graph ref={ref} />;
};
