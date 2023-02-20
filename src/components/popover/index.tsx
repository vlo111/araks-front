import { Popover as PopoverComponent, PopoverProps } from "antd";

import './index.css';

export const ProjectActionPopover = (props: PopoverProps) => <PopoverComponent
    {...props}
    overlayClassName="project-popover-action" 
    placement="rightTop" 
/>;
