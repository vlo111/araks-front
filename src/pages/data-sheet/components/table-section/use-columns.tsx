import { ColumnsType } from "antd/es/table";
import { useGetProjectNoteTypeProperties } from "api/project-node-type-property/use-get-project-note-type-properties";
import { DataType } from "./types";

export const useColumns = () => {
    const { data } = useGetProjectNoteTypeProperties();

    const columns: ColumnsType<DataType> =  data?.map(item => ({
        title: item.name,
        width: 100,
        dataIndex: 'address',
        key: item.id,
        
    })) || [] as ColumnsType<DataType>;

    return columns;
}