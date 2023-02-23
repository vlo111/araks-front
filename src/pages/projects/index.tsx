import { Space } from "antd"
import { PROJECT_SORT, Sort, Template } from "../../components/dropdown"
import VerticalSpace from "../../components/space/vertical-space"
import { View } from "../../components/view"
import { SortProvider } from "../../context/sort-context"
import { ViewProvider } from "../../context/view-context"
import { Folders } from "./components/folder/folders"
import { MyProjects } from "./components/my-projects"

export const Projects = () => {
    return <ViewProvider>
        <SortProvider>
            <VerticalSpace size="large">
                <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Template />
                    <Space size='middle'>
                        <Sort sortItems={PROJECT_SORT} />
                        <View />
                    </Space>
                </Space>
                <div>
                    <Folders />
                </div>
                <div>
                    <MyProjects />
                </div>
            </VerticalSpace>
        </SortProvider>
    </ViewProvider>
}