import { ColumnsType } from "antd/es/table";

import { DataType } from "./types";

import { PlusAction } from "components/actions/plus";
import { useTypeProperty } from "./table-context";
import { AddTypeProprty } from "components/button/add-type-property";


export const useActions = () => {
    const {state, dispatch} = useTypeProperty();

    return [
        {
            title: <AddTypeProprty />,
            key: 'operation',
            fixed: 'right',
            dataIndex: 'key',
            width: '64px',
            className: 'action-class',
            render: () => '',
            align: 'center',
        },
        {
            key: 'space',
            fixed: 'right',
            dataIndex: 'space',
        }
    ] as ColumnsType<DataType>;
}