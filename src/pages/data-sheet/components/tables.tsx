import { useState } from "react";
import { NodeTypes } from "./node-types"
import { NodesHeader } from "./nodes-header"

export const Tables = () => {
    const [visible, setVisible] = useState(true);
    return <>
        <NodesHeader visible={visible} setVisible={setVisible} />
        <NodeTypes visible={visible} setVisible={setVisible} />
    </>
}