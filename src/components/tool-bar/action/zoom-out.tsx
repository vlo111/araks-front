import React from 'react';
import { Tooltip } from 'antd';
import { ReactComponent as ZoomOutSVG } from '../icons/minus.svg';

export const ZoomOut: React.FC<{ onZoomOut: VoidFunction }> = ({ onZoomOut }) => {
  return (
    <Tooltip key={4} placement="left" title="Zoom Out (Cmd -)">
      <div className="zoomOut" onClick={onZoomOut}>
        <ZoomOutSVG />
      </div>
    </Tooltip>
  );
};
