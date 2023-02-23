import { Col, Row } from "antd"
import { AddFolderButton, FolderButton } from "components/button"
import { TitleSeparator } from "components/typography"
import { useView, ViewTypes } from "context/view-context"

export const Folders = () => {
    const { state } = useView();
    return <>
        <TitleSeparator name='Folders' />
        {state === ViewTypes.Block ? <Row gutter={24}>
            <Col span={8}>
                <AddFolderButton block />
            </Col>
            <Col span={8}>
                <FolderButton folderName='Scientists' countItems={20} block />
            </Col>
            <Col span={8}>
                <FolderButton folderName="Country Analysis" countItems={32} block />
            </Col>
        </Row> : <Row>
            <Col span={24}>
                <AddFolderButton block fullWidth={true} />
            </Col>
            <Col span={24}>
                <FolderButton folderName='Scientists' countItems={20} block fullWidth={true} />
            </Col>
            <Col span={24}>
                <FolderButton folderName="Country Analysis" countItems={32} block fullWidth={true} />
            </Col>
        </Row>}
    </>
}