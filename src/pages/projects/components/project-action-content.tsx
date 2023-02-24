import { Space } from "antd";
import useGetFolders from "api/folders/use-get-folders";
import { FolderType, ProjectActionMenu } from "components/menu";
import { FolderListResponse } from "types/folder";

type MoveToFolder = {
    type: FolderType,
    name: string,
    count: number,
    key: string,
};

type Props = {
    projectId: string;
}

export const ProjectActionContent = ({ projectId }: Props) => {
    const { data } = useGetFolders({
        page: 1,
        size: 100,
        sortField: 'title',
        sortOrder: 'ASC'
    });

    return <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ProjectActionMenu 
            projectId={projectId}
            foldersList={data?.rows?.reduce(
                (accumulator: MoveToFolder[], currentValue: FolderListResponse): MoveToFolder[] => {
                    return [...accumulator, {
                        type: FolderType.folder,
                        name: currentValue.title,
                        count: currentValue.projectCount,
                        key: currentValue.id,
                    }]
        }, [])} />
    </Space>
}