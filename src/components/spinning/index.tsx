import { Spin, SpinProps } from 'antd';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

export const SpinningWrapper = styled(Spin)`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100% !important;
  height: 100vh !important;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const Spinning = (params: SpinProps) => (
  <SpinningWrapper indicator={<LoadingOutlined style={{ fontSize: 120 }} />} spinning={true} {...params} />
);
