import React from 'react';
import { Tooltip } from 'antd';
import { ReactComponent as FitSVG } from './icons/fit.svg';

export const FitSchema: React.FC<{ onCenterContent: VoidFunction }> = ({ onCenterContent }) => {
  return (
    <Tooltip key={2} placement="left" title="Fit Schema">
      <div className="box fit" onClick={onCenterContent}>
        <FitSVG />
      </div>
    </Tooltip>
  );
};
