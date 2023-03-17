import { AddType } from "components/button"
import { ColorFill } from "components/color-fill"
import { EmptyList } from "components/empty"
import { useDataSheetWrapper } from "components/layouts/components/data-sheet/wrapper"
import { HeaderActions } from "./header-actions"

export const RightSection = () => {
    const { startAddType, finishAddType, addTypeisOpened, color, titleText } = useDataSheetWrapper();
    console.log('addTypeisOpened', addTypeisOpened);

    return <>
        <ColorFill color={color} />
        <AddType 
            titleText={titleText} 
            onClick={startAddType} 
            open={addTypeisOpened} onOpenChange={(open) => {
                !open && finishAddType();
                return open;
            }}>
                <HeaderActions />
            </AddType>
        <EmptyList />
    </>
}