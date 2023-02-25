import { LongTextPopover } from "components/popover";
import { Text } from "./text";

type Props = {
    className?: string;
    cutPosition?: number;
    name: string;
}

export const LongTitle = ({ name, cutPosition = 19, className }: Props) => <LongTextPopover 
    title={<Text>{name}</Text>}
    align={{ offset: [15, 22] }}
    children={<Text className={className} children={name.substring(0, cutPosition) + '...'} />}
/>;
