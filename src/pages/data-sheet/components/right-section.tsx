import { AddType } from "components/button/add-type"
import { ColorFill } from "components/color-fill"
import { EmptyList } from "components/empty"

export const RightSection = () => {
    return <>
        <ColorFill />
        <AddType block>+ Add Type</AddType>
        <EmptyList />
    </>
}