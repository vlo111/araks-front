import { Space } from "antd"

import { ReactComponent as Blocks } from '../icons/blocks.svg';
import { ReactComponent as BlocksSelected } from '../icons/blocks-selected.svg';
import { ReactComponent as Grid } from '../icons/grid.svg';
import { ReactComponent as GridSelected } from '../icons/grid-selected.svg';
import { type } from "os";

enum ViewTypes {
    Block = 0,
    Grid = 1,
  }

type Props = {
    selectedType: ViewTypes
}

export const View = ({ selectedType = ViewTypes.Block }: Props) => {

    return <Space>
        {
            selectedType === ViewTypes.Block ? <>
                <BlocksSelected />
                <Grid />
            </> : <>
                <Blocks />
                <GridSelected />
            </>
        }
    </Space>
}