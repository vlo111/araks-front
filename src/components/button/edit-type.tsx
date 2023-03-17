import { PopoverProps } from "antd";
import { SettingsAction } from "components/actions";
import { AddTypeForm } from "components/form/add-type-form";
import { AddNodeTypePopover } from "components/popover";

export type EditTypeProps = PopoverProps & {
    onClick: () => void
};

export const EditType = ({ onClick, ...props }: EditTypeProps) => <AddNodeTypePopover
     content={<AddTypeForm />}
    trigger="click" {...props}>
        <SettingsAction button={{ onClick }} />
    </AddNodeTypePopover>;