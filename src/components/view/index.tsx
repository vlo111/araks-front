import { Button, Space } from "antd"

import { ReactComponent as Blocks } from '../icons/blocks.svg';
import { ReactComponent as BlocksSelected } from '../icons/blocks-selected.svg';
import { ReactComponent as Grid } from '../icons/grid.svg';
import { ReactComponent as GridSelected } from '../icons/grid-selected.svg';
import { useView, ViewTypes } from "../../context/view-context";
import styled from "styled-components";

const ViewButton = styled(Button)`
    background-color: transparent;
    border: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const View = () => {
    const {state, dispatch} = useView();
    console.log('state', state);
    

    return <Space align="center">
        {
            state === ViewTypes.Block ? <>
                <ViewButton icon={<BlocksSelected />}/>
                <ViewButton icon={<Grid onClick={() => dispatch(ViewTypes.Grid)} />}/>
            </> : <>
                <ViewButton icon={<Blocks onClick={() => dispatch(ViewTypes.Block)} />}/>
                <ViewButton icon={<GridSelected />}/>
            </>
        }
    </Space>
}