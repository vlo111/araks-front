import { Space } from "antd";
import { FolderType, ProjectActionMenu } from "components/menu";

export const ProjectActionContent = () => {

    return <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ProjectActionMenu foldersList={[
            {type: FolderType.all, name: 'All projects', key: 'sub1'},
            {type: FolderType.folder, name: 'Folder name full test something', count: 20, key: 'sub2'}
        ]} />
    </Space>
}