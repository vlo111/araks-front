import { Space } from "antd"
import { DownloadAction, SearchAction, SearchPostionTypes, SettingsAction, UploadAction } from "components/actions"

export const HeaderActions = () => {
    return <Space size={8}>
        <SearchAction position={SearchPostionTypes.right} />
        <UploadAction />
        <DownloadAction />
        <SettingsAction />
    </Space>
}