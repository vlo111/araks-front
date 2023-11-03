import React from 'react';
import styled from 'styled-components';
import { Progress } from 'antd';
import { useProgressBar } from './use-progress-bar';

const conicColors = { '0%': '#303030', '50%': '#808080', '100%': '#59CFDF' };

const ProgressBarWrapper = styled(Progress)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(35, 47, 106, 0.2);
  backdrop-filter: blur(8px);

  .ant-progress-inner {
    left: 45%;
    top: 35%;
  }
`;

interface ProgressBarProps {
  isLoading: boolean;
  isFinished: VoidFunction;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ isLoading, isFinished }) => {
  const { showProgress, isLoadingChanges, percent } = useProgressBar(isLoading, isFinished);

  return (
    <div>
      {showProgress && isLoadingChanges === 0 ? null : (
        <ProgressBarWrapper type="circle" percent={percent} strokeColor={percent < 100 ? conicColors : undefined} />
      )}
    </div>
  );
};
