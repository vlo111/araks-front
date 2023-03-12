import { AddType } from "components/button"
import { ColorFill } from "components/color-fill"
import { EmptyList } from "components/empty"
import { HeaderActions } from "./header-actions"

export const RightSection = () => {
    return <>
        <ColorFill />
        <AddType><HeaderActions /></AddType>
        <EmptyList />
    </>
}