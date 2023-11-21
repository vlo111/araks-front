import React from 'react';
import styled from 'styled-components';
import { useProgressBar } from './use-progress-bar';
import { Progress } from 'antd';

const conicColors = { '0%': '#303030', '50%': '#808080', '100%': '#59CFDF' };

const ProgressBarWrapper = styled(Progress)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2000;
  background: rgba(35, 47, 106, 0.2);
  backdrop-filter: blur(8px);
  height: 100vh;

  .ant-progress-inner {
    left: 45%;
    top: 35%;
  }
`;

interface ProgressComponentProps {
  start: boolean;
  stop: boolean;
}

export const ProgressBar: React.FC<ProgressComponentProps> = ({ start, stop }) => {
  const { percent, close } = useProgressBar(start, stop);

  if (close) return null;

  return <ProgressBarWrapper type="circle" percent={percent} strokeColor={percent < 100 ? conicColors : undefined} />;
};
