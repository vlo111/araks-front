import { AddType } from "components/button"
import { ColorFill } from "components/color-fill"
import { EmptyList } from "components/empty"
import { useDataSheetWrapper } from "components/layouts/components/data-sheet/wrapper"
import { HeaderActions } from "./header-actions"

export const RightSection = () => {
    const { setAddType, addTypeisOpened, hasNodeTypes, color } = useDataSheetWrapper();

    return <>
        <ColorFill color={color} />
        <AddType showButton={hasNodeTypes} onClick={() => setAddType(true)} open={addTypeisOpened} onOpenChange={(open) => setAddType(open)}><HeaderActions /></AddType>
        <EmptyList />
    </>
}