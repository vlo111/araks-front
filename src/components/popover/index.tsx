import { Popover as PopoverComponent, PopoverProps } from "antd";
import { FullWidth } from "types/project";

import './index.css';

type Props = PopoverProps & FullWidth;

export const ProjectActionPopover = ({fullWidth, ...props}: Props) => <PopoverComponent
    placement={fullWidth ? 'top' : "rightTop" }
    trigger="click"
    {...props}
    overlayClassName="project-popover-action" 
/>;

export const LongTextPopover = ({fullWidth, ...props}: Props) => <PopoverComponent
    placement='top'
    mouseEnterDelay={0.4}
    overlayClassName="long-text" 
    {...props}
/>;

export const AddNodeTypePopover = (props: PopoverProps) => <PopoverComponent
    placement="bottom"
    trigger="click"
    {...props}
    overlayClassName="project-popover-node-type" 
/>;

export const SelectColorPopover = (props: PopoverProps) => <PopoverComponent
    placement="bottom"
    trigger="click"
    {...props}
    overlayClassName="project-popover-node-type" 
/>;