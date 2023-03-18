import { Space } from "antd"
import { DownloadAction, SearchAction, SearchPostionTypes, UploadAction } from "components/actions"
import { EditType, EditTypeProps } from "components/button/edit-type";
import { useDataSheetWrapper } from "components/layouts/components/data-sheet/wrapper";

export const HeaderActions = () => {
    const { startEditType, finishEditType, editTypeisOpened, nodeTypeId } = useDataSheetWrapper();

    const editTypeProps: EditTypeProps = nodeTypeId ? {
        onClick: startEditType,
        open: editTypeisOpened,
        onOpenChange: (open: boolean) => {
            !open && finishEditType();
            return open;
        }
    } : {} as EditTypeProps;

    return <Space size={8}>
        <SearchAction position={SearchPostionTypes.right} />
        <UploadAction />
        <DownloadAction />
        <EditType {...editTypeProps} />
    </Space>
}