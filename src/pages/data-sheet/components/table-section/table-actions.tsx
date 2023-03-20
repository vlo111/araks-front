import { ColumnsType } from "antd/es/table";
import { DataType } from "./types";

import { PlusOutlined } from '@ant-design/icons';


export const actions = [
    {
        title: <PlusOutlined />,
        key: 'operation',
        fixed: 'right',
        dataIndex: 'key',
        width: '64px',
        className: 'action-class',
        render: () => ''
    },
    {
        key: 'space',
        fixed: 'right',
        dataIndex: 'space',
    }
] as ColumnsType<DataType>;