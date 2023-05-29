import styled from 'styled-components';
import { useGraphRef } from 'hooks/use-graph';
import { useNodes } from 'hooks/use-nodes';
import { Spin } from "antd";

const Graph = styled.div`
  position: fixed;
  top: 152px;
  z-index: 0;
`;
const Spinner = styled(Spin)`
  .ant-spin-dot {
    position: fixed !important;
  }
`

export const RenderSchema = () => {
  const ref = useGraphRef();

   const { isInitialLoading } = useNodes();

  return <Spinner spinning={isInitialLoading}> <Graph ref={ref} /></Spinner>;
};
