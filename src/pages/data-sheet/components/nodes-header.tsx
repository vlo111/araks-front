import { Button, Space } from "antd";
import { CaretUpFilled, CaretDownFilled } from '@ant-design/icons';
import { Text } from "components/typography";
import { PlusOutlined } from '@ant-design/icons';
import { SearchAction } from "components/actions";
import { useDataSheetWrapper } from "components/layouts/components/data-sheet/wrapper";
import { PropsSetState } from "../types";

export const NodesHeader = ({ visible, setVisible }: PropsSetState) => {
    
    const { setAddType } = useDataSheetWrapper();

    return <Space size={8} style={{ width: '100%' }} align='center' >
        <Button type="text" icon={visible ? <CaretDownFilled /> : <CaretUpFilled /> } onClick={() => setVisible(prev => !prev)}>
            <Text>Node Type</Text>
        </Button>
        <SearchAction />
        <PlusOutlined  style={{ cursor: 'pointer' }} onClick={() => setAddType(true)} />
    </Space>
}