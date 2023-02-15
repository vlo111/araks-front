import { Space } from "antd"
import { Sort, Template } from "../../components/dropdown"
import VerticalSpace from "../../components/space/vertical-space"
import { View } from "../../components/view"
import { ViewProvider } from "../../context/view-context"


export const Projects = () => {
    return <ViewProvider>
            <VerticalSpace size="large">
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Template />
                <Space size='middle'>
                    <Sort />
                    <View />
                </Space>
            </Space>
        </VerticalSpace>
    </ViewProvider>
}