import React from 'react';
import { Tooltip } from 'antd';

import { ReactComponent as ZoomInSVG } from '../icons/plus.svg';

export const ZoomIn: React.FC<{ onZoomIn: VoidFunction }> = ({ onZoomIn }) => {
  return (
    <Tooltip key={3} placement="left" title="Zoom In (Cmd +)">
      <div className="zoomIn" onClick={onZoomIn}>
        <ZoomInSVG />
      </div>
    </Tooltip>
  );
};
