import { Spin, SpinProps } from 'antd';
import styled from 'styled-components';

export const SpinningWrapper = styled(Spin)`
  position: fixed;
  left: 0;
  top: 150px;
  width: 100% !important;
  height: calc(100% - 150px) !important;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const Spinning = (params: SpinProps) => <SpinningWrapper spinning={true} {...params} />;
