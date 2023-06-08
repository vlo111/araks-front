import { Tooltip as TooltipComponent, TooltipProps } from 'antd';
import './index.css';

export const Tooltip = (props: TooltipProps) => (
  <TooltipComponent
    overlayClassName="project-tooltip"
    placement="bottom"
    {...props}
  />
);
