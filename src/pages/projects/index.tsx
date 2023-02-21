import { Badge, Col, Row, Space } from "antd"
import { ProjectActionPopover } from "components/popover"
import { AddFolderButton, CreateNewProjectButton, FolderButton, ProjectButton } from "../../components/button"
import { PROJECT_SORT, Sort, Template } from "../../components/dropdown"
import VerticalSpace from "../../components/space/vertical-space"
import { TitleSeparator } from "../../components/typography"
import { View } from "../../components/view"
import { SortProvider } from "../../context/sort-context"
import { ViewProvider } from "../../context/view-context"
import { ProjectActionContent } from "./components/project-action-content"
import { ProjectActionTitle } from "./components/project-action-title"

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
                    <TitleSeparator name='Folders' />
                    <Row gutter={24}>
                        <Col span={8}>
                            <AddFolderButton block />
                        </Col>
                        <Col span={8}>
                            <FolderButton folderName='Scientists' countItems={20} block />
                        </Col>
                        <Col span={8}>
                            <FolderButton folderName="Country Analysis" countItems={32} block />
                        </Col>
                    </Row>
                </div>
                <div>
                    <TitleSeparator name='All Projects' paginationProps={{total: 50}} />
                    {/* set if count < 7 start otherwise space-between  */}
                    <Row gutter={34} justify='start'>
                        <Col span={3}>
                            <CreateNewProjectButton />
                        </Col>
                        <Col span={3}>
                        <ProjectActionPopover title={<ProjectActionTitle />} content={<ProjectActionContent />}>
                            <ProjectButton project={{color: 'red', name: 'Knowledge Mode', type: 'public', dateTime: '2022.09.05 18:03'}} />
                        </ProjectActionPopover>
                        </Col>
                    </Row>
                </div>``
            </VerticalSpace>
        </SortProvider>
    </ViewProvider>
}