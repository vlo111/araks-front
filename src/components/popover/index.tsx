import { Popover as PopoverComponent, PopoverProps } from "antd";
import { FullWidth } from "components/button/project-button";

import './index.css';

type Props = PopoverProps & FullWidth;

export const ProjectActionPopover = ({fullWidth, ...props}: Props) => <PopoverComponent
    placement={fullWidth ? 'top' : "rightTop" }
    {...props}
    overlayClassName="project-popover-action" 
/>;
