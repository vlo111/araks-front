import { Button, Drawer } from "antd";
import { useState } from "react";
import styled from "styled-components";

const CommentsLikesDrawer = styled(Drawer)`

`;

export const Comments = () => {
    const [open, setOpen] = useState(false);
    return <>
        <Button type="primary" onClick={() => setOpen(state => !state)}>Comments</Button>
        <CommentsLikesDrawer 
            open={open} 
            title={''}
            closable={false}
            placement='bottom'
            width='50vw'
        >

        </CommentsLikesDrawer>
    </>
}
