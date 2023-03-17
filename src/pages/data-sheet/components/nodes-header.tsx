import { Button, Space } from "antd";
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import { Text } from "components/typography";
import { PlusOutlined } from '@ant-design/icons';
import { SearchAction } from "components/actions";
import { useDataSheetWrapper } from "components/layouts/components/data-sheet/wrapper";
import { PropsSetState } from "../types";
import { COLORS } from "helpers/constants";

export const NodesHeader = ({ visible, setVisible }: PropsSetState) => {
    
    const { startAddType } = useDataSheetWrapper();

    return <Space size={8} style={{ width: '100%', padding: '24px' }} align='center' >
        <Button type="text" icon={visible ? <CaretDownFilled style={{ color: COLORS.PRIMARY.GRAY}} /> : <CaretUpFilled style={{ color: COLORS.PRIMARY.GRAY}} /> } onClick={() => setVisible(prev => !prev)}>
            <Text>Node Type</Text>
        </Button>
        <SearchAction />
        <PlusOutlined  style={{ cursor: 'pointer' }} onClick={startAddType} />
    </Space>
}