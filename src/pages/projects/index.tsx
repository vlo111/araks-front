import { Col, Row, Space } from "antd"
import { AddFolderButton, CreateNewProjectButton } from "../../components/button"
import { Sort, Template } from "../../components/dropdown"
import VerticalSpace from "../../components/space/vertical-space"
import { TitleSeparator } from "../../components/typography"
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
            <div>
                <TitleSeparator name='Folders' />
                <Row>
                    <Col span={8}>
                        <AddFolderButton block />
                    </Col>
                </Row>
            </div>
            <div>
                <TitleSeparator name='All Projects' paginationProps={{total: 50}} />
                <Row>
                    <Col span={8}>
                        <CreateNewProjectButton />
                    </Col>
                </Row>
            </div>
        </VerticalSpace>
    </ViewProvider>
}