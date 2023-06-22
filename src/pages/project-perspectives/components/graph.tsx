import styled from 'styled-components';
import { useSchemaRef } from 'hooks/use-schema';
import { useTypes } from 'hooks/use-types';
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
  const ref = useSchemaRef();

   const { isInitialLoading } = useTypes();

  return <Spinner spinning={isInitialLoading}> <Graph ref={ref} /></Spinner>;
};
