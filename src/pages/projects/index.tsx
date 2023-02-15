import { Space } from "antd"
import { Sort, Template } from "../../components/dropdown"
import VerticalSpace from "../../components/space/vertical-space"
import { ViewProvider } from "../../context/view-context"


export const Projects = () => {
    return <ViewProvider>
            <VerticalSpace size="large">
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Template />
                <Space>
                    <Sort />
                </Space>
            </Space>
        </VerticalSpace>
    </ViewProvider>
}