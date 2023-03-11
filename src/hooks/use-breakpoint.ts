import { Grid } from "antd"

const { useBreakpoint } = Grid;

export const useIsXXlScreen = () => {
    const { xxl } = useBreakpoint();

    return xxl;
}