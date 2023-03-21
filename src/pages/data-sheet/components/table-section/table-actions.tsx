import { ColumnsType } from "antd/es/table";

import { DataType, TypePropertyActionKind } from "./types";

import { PlusAction } from "components/actions/plus";
import { useTypeProperty } from "./table-context";
import { AddTypeProprty } from "components/button/add-type-property";
import { useCallback, useMemo } from "react";


export const useActions = () => {
    const {state: { actionColWidth }} = useTypeProperty();

    return useMemo(() => [
        {
            title: <AddTypeProprty />,
            key: 'operation',
            fixed: 'right',
            dataIndex: 'key',
            width: actionColWidth || '64px',
            className: 'action-class',
            render: () => '',
            align: 'center',
        },
        {
            key: 'space',
            fixed: 'right',
            dataIndex: 'space',
        }
    ] as ColumnsType<DataType>, [actionColWidth]);
}