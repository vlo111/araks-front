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
    folderId: string;
}

export const FolderActionContent = ({ projectId, folderId }: Props) => {
    const { data } = useGetFolders({
        page: 1,
        size: 100,
        sortField: 'title',
        sortOrder: 'ASC'
    });

    const initialReduce = folderId ? [{
        type: FolderType.all,
        name: 'All projects',
        key: 'all',
    }] : [];

    return <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ProjectActionMenu 
            projectId={projectId}
            folderId={folderId}
            foldersList={data?.rows?.reduce(
                (accumulator: MoveToFolder[], currentValue: FolderListResponse): MoveToFolder[] => {
                    return [...accumulator, {
                        type: FolderType.folder,
                        name: currentValue.title,
                        count: +currentValue.projectCount,
                        key: currentValue.id,
                    }]
        }, initialReduce)} />
    </Space>
}