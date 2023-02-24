import { Col, PaginationProps, Row, Spin } from "antd"
import useGetFolders from "api/folders/use-get-folders"
import { GetProjectsParameters } from "api/types"
import { AddFolderButton, FolderButton } from "components/button"
import { TitleSeparator } from "components/typography"
import { useSort } from "context/sort-context"
import { useView, ViewTypes } from "context/view-context"
import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import { FolderListResponse } from "types/folder"
import { CreateNewFolder } from "./create-new-folder";

export const initData: GetProjectsParameters = {
    page: 1,
    size: 5,
    sortField: 'title',
    sortOrder: 'ASC'
};

export enum FolderAction {
    CHANGE_PAGE = 'CHANGE_PAGE',
    CHANGE_SORT = 'CHANGE_SORT',
}

export type FolderActionType = GetProjectsParameters & {
    type: FolderAction;
};

export const folderReducer = (state: GetProjectsParameters, action: FolderActionType): GetProjectsParameters => {
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

    const { data, isLoading } = useGetFolders(folderState);

    const onPaginationChange: PaginationProps['onChange'] = useCallback(
      (page: number) => {
        dispatch({ type: FolderAction.CHANGE_PAGE, page })
      },
      [],
    )

    const paginationProps = useMemo(() => data.count ? ({
        onChange: onPaginationChange,
        total: data.count,
        defaultPageSize: 6,
        current: folderState.page,
    }) : undefined, [data.count, folderState.page, onPaginationChange]);

    return <Spin spinning={isLoading}>
        <TitleSeparator name='Folders' paginationProps={paginationProps} />
        {state === ViewTypes.Block ? <Row gutter={[24, 24]}>
            <Col span={8}>
                <CreateNewFolder />
            </Col>
            {
                data?.rows?.map((item: FolderListResponse) => <Col span={8} key={item.id}>
                    <FolderButton folderName={item.title} countItems={item.projectCount} block />
                </Col>)
            }
        </Row> : <Row>
            <Col span={24}>
                <AddFolderButton block fullWidth={true} />
            </Col>
            {
                data?.rows?.map((item: FolderListResponse) => <Col span={8} key={item.id}>
                    <FolderButton folderName={item.title} countItems={item.projectCount} block fullWidth={true} />
                </Col>)
            }
        </Row>}
    </Spin>
}