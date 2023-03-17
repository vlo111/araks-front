import { LongTextPopover } from "components/popover";
import { VARIABLES } from "helpers/constants";
import { Text } from "./text";

type Props = {
    className?: string;
    cutPosition?: number;
    name: string;
}

export const LongTitle = ({ name, cutPosition = VARIABLES.MAX_PROJECT_TITLE_LENGTH, className }: Props) => <LongTextPopover 
    title={<Text>{name}</Text>}
    align={{ offset: [15, 22] }}
    children={<Text className={className}>{name.substring(0, cutPosition) + '...'}</Text>}
/>;
