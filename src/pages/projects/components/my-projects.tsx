import { Col, Row } from "antd"
import { CreateNewProjectButton, ProjectButton } from "components/button"
import { ProjectActionPopover } from "components/popover"
import { TitleSeparator } from "components/typography"
import { useView, ViewTypes } from "context/view-context"
import { ProjectActionContent } from "./project-action-content"
import { ProjectActionTitle } from "./project-action-title"

export const MyProjects = () => {
    const { state } = useView();

    return <>
        <TitleSeparator name='All Projects' paginationProps={{total: 50}} />
        {/* set if count < 7 start otherwise space-between  */}
        {state === ViewTypes.Block ? <Row gutter={34} justify='start'>
            <Col span={3}>
                <CreateNewProjectButton />
            </Col>
            <Col span={3}>
                <ProjectActionPopover title={<ProjectActionTitle />} content={<ProjectActionContent />}>
                    <ProjectButton project={{color: 'red', name: 'Knowledge Mode', type: 'public', dateTime: '2022.09.05 18:03'}} />
                </ProjectActionPopover>
            </Col>
        </Row> : <Row gutter={[0, 16]}>
            <Col span={24}>
                <CreateNewProjectButton fullWidth block />
            </Col>
            <Col span={24}>
                <ProjectActionPopover fullWidth  title={<ProjectActionTitle />} content={<ProjectActionContent />}>
                    <ProjectButton fullWidth block project={{color: 'red', name: 'Knowledge Mode', type: 'public', dateTime: '2022.09.05 18:03'}} />
                </ProjectActionPopover>
            </Col>
        </Row>}
    </>
}