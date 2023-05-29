import React from 'react';
import { Tooltip } from 'antd';

import { ReactComponent as FindSVG } from '../icons/find.svg';

export const FitType: React.FC<{ onCenterType: VoidFunction }> = ({ onCenterType }) => {
  return (
    <Tooltip key={1} placement="left" title="Fit Selected Type">
      <div className="box find" onClick={onCenterType}>
        <FindSVG />
      </div>
    </Tooltip>
  );
};
