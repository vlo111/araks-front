import { Col, PaginationProps, Row } from "antd"
import useGetFolders, { GetFoldersParameters } from "api/folders/use-get-folders"
import { AddFolderButton, FolderButton } from "components/button"
import { TitleSeparator } from "components/typography"
import { useSort } from "context/sort-context"
import { useView, ViewTypes } from "context/view-context"
import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import { CreateNewFolder } from "./create-new-folder";

const initData: GetFoldersParameters = {
    page: 1,
    size: 10,
    sortField: 'name',
    sortOrder: 'asc'
};

enum FolderAction {
    CHANGE_PAGE = 'CHANGE_PAGE',
    CHANGE_SORT = 'CHANGE_SORT',
}

type FolderActionType = GetFoldersParameters & {
    type: FolderAction;
};

const folderReducer = (state: GetFoldersParameters, action: FolderActionType): GetFoldersParameters => {
    switch (action.type) {
      case FolderAction.CHANGE_PAGE:
        return {
          ...state,
          page: action.page
        };
      case FolderAction.CHANGE_SORT:
        return {
            ...state,
            sortField: action.sortField,
            sortOrder: action.sortOrder,
        };
      default:
        return state;
    }
  };

export const Folders = () => {
    const { state } = useView();
    const { state: sortState } = useSort();

    const [orderName, order] = useMemo(() => sortState?.split(' ') || [], [sortState]);
    const [folderState, dispatch] = useReducer(folderReducer, initData);

    useEffect(() => {
        if (orderName && order) {
            dispatch({ type: FolderAction.CHANGE_SORT, sortField: orderName, sortOrder: order })
        }
    }, [order, orderName]);

    console.log(folderState);

    const { data } = useGetFolders(folderState);

    const onPaginationChange: PaginationProps['onChange'] = useCallback(
      (page: number) => {
        dispatch({ type: FolderAction.CHANGE_PAGE, page })
      },
      [],
    )
    
    const paginationProps = useMemo(() => data.length ? ({
        onChange: onPaginationChange,
        total: data.length,
    }) : undefined, [data.length, onPaginationChange]);

    return <>
        <TitleSeparator name='Folders' paginationProps={paginationProps} />
        {state === ViewTypes.Block ? <Row gutter={24}>
            <Col span={8}>
                <CreateNewFolder />
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