import { Col, ColProps, PaginationProps, Row, RowProps, Spin } from "antd";
import dayjs from 'dayjs';
import useGetProjects from "api/projects/use-get-projects";
import { CreateNewProjectButton, ProjectButton } from "components/button";
import { ProjectActionPopover } from "components/popover"
import { TitleSeparator } from "components/typography";
import { useSort } from "context/sort-context";
import { useView, ViewTypes } from "context/view-context";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { ProjectListResponse } from "types/project";
import { FolderAction, folderReducer, initData } from "./folder/folders";
import { ProjectActionContent } from "./project-action-content";
import { ProjectActionTitle } from "./project-action-title";

let propsBlockView = {
    row: {
        gutter: [42, 24],
        justify: 'start'
    },
    col: {
       // span: 3,
        //offset: 1
    },
    newProject: {},
    project: {}, 
    projectButton: {}, 
};

let propsGridView = {
    row: {
        gutter: [0, 16],
    },
    col: {
        span: 24
    },
    newProject: { fullWidth: true, block: true },
    project: { fullWidth: true }, 
    projectButton: { fullWidth: true, block: true }, 
};

const colStyles = {
    flexBasis: "13%",
  };

export const MyProjects = () => {
    const { state } = useView();
    const { state: sortState } = useSort();

    const [orderName, order] = useMemo(() => sortState?.split(' ') || [], [sortState]);
    const [folderState, dispatch] = useReducer(folderReducer, { ...initData, size: 13 });

    useEffect(() => {
        if (orderName && order) {
            dispatch({ type: FolderAction.CHANGE_SORT, sortField: orderName, sortOrder: order })
        }
    }, [order, orderName]);

    const { data, isLoading } = useGetProjects(folderState);

    const onPaginationChange: PaginationProps['onChange'] = useCallback(
        (page: number) => {
          dispatch({ type: FolderAction.CHANGE_PAGE, page })
        },
        [],
      )
      
      const paginationProps = useMemo(() => data.count ? ({
          onChange: onPaginationChange,
          total: data.count,
          defaultPageSize: 13,
          current: folderState.page,
      }) : undefined, [data.count, folderState.page, onPaginationChange]);

      const dataToDraw = useMemo(() => state === ViewTypes.Block ? propsBlockView : propsGridView, [state]);

    return <Spin spinning={isLoading}>
        <TitleSeparator name='All Projects' paginationProps={paginationProps} />
        <Row {...(dataToDraw.row as RowProps)} justify={state === ViewTypes.Block && data.count >= 6 ? 'start' : 'start'} >
            <Col {...(dataToDraw.col as ColProps)} style={{ ...colStyles }}>
                <CreateNewProjectButton {...(dataToDraw.newProject)} />
            </Col>
            {
                data?.rows?.map((item: ProjectListResponse) => <Col key={item.id} {...(dataToDraw.col as ColProps)} style={{ ...colStyles }}>
                    <ProjectActionPopover title={<ProjectActionTitle />} content={<ProjectActionContent projectId={item.id} />} {...(dataToDraw.project)}>
                        <ProjectButton project={{color: item.color, name: item.title, type: item.privacy, dateTime: dayjs(item.updated_at).format('YYYY-MM-DD HH:mm')}} {...(dataToDraw.projectButton)} />
                    </ProjectActionPopover>
                </Col>)
            }
            
        </Row>
    </Spin>
}