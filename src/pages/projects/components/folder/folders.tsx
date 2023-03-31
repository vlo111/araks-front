import { Col, ColProps, PaginationProps, Row, RowProps, Spin } from 'antd';
import { useGetFolders } from 'api/folders/use-get-folders';
import { GetProjectsParameters } from 'api/types';
import { FolderButton } from 'components/button';
import { TitleSeparator } from 'components/typography';
import { useSort } from 'context/sort-context';
import { useView, ViewTypes } from 'context/view-context';
import { PATHS } from 'helpers/constants';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderListResponse } from 'types/folder';
import { propsFolderBlockView, propsFolderGridView } from '../constants';
import { CreateNewFolder } from './create-new-folder';

export const initData: GetProjectsParameters = {
  page: 1,
  size: 5,
  sortField: 'title',
  sortOrder: 'ASC',
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
        page: action.page,
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
  const navigate = useNavigate();

  const [orderName, order] = useMemo(() => sortState?.split(' ') || [], [sortState]);
  const [folderState, dispatch] = useReducer(folderReducer, initData);

  useEffect(() => {
    if (orderName && order) {
      dispatch({ type: FolderAction.CHANGE_SORT, sortField: orderName, sortOrder: order });
    }
  }, [order, orderName]);

  const { data, isInitialLoading } = useGetFolders(folderState);

  const onPaginationChange: PaginationProps['onChange'] = useCallback((page: number) => {
    dispatch({ type: FolderAction.CHANGE_PAGE, page });
  }, []);

  const paginationProps = useMemo(
    () =>
      data.count
        ? {
            onChange: onPaginationChange,
            total: data.count,
            defaultPageSize: 5,
            current: folderState.page,
          }
        : undefined,
    [data.count, folderState.page, onPaginationChange]
  );

  const dataToDraw = useMemo(() => (state === ViewTypes.Block ? propsFolderBlockView : propsFolderGridView), [state]);

  return (
    <Spin spinning={isInitialLoading}>
      <TitleSeparator name="Folders" paginationProps={paginationProps} />
      <Row {...(dataToDraw.row as RowProps)}>
        <Col {...(dataToDraw.col as ColProps)}>
          <CreateNewFolder />
        </Col>
        {data?.rows?.map((item: FolderListResponse) => (
          <Col {...(dataToDraw.col as ColProps)} key={item.id}>
            <FolderButton
              onDoubleClick={() => navigate(PATHS.FOLDER.replace(':id', item.id))}
              {...dataToDraw.folderButton}
              folderName={item.title}
              folderId={item.id}
              countItems={+item.projectCount}
            />
          </Col>
        ))}
      </Row>
    </Spin>
  );
};
