import { Col, PaginationProps, Row } from "antd"
import useGetProjects from "api/projects/use-get-projects"
import { CreateNewProjectButton, ProjectButton } from "components/button"
import { ProjectActionPopover } from "components/popover"
import { TitleSeparator } from "components/typography"
import { useSort } from "context/sort-context"
import { useView, ViewTypes } from "context/view-context"
import { useCallback, useEffect, useMemo, useReducer } from "react"
import { FolderAction, folderReducer, initData } from "./folder/folders"
import { ProjectActionContent } from "./project-action-content"
import { ProjectActionTitle } from "./project-action-title"

export const MyProjects = () => {
    const { state } = useView();
    const { state: sortState } = useSort();

    const [orderName, order] = useMemo(() => sortState?.split(' ') || [], [sortState]);
    const [folderState, dispatch] = useReducer(folderReducer, initData);

    useEffect(() => {
        if (orderName && order) {
            dispatch({ type: FolderAction.CHANGE_SORT, sortField: orderName, sortOrder: order })
        }
    }, [order, orderName]);

    const { data } = useGetProjects(folderState);

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
        <TitleSeparator name='All Projects' paginationProps={paginationProps} />
        {/* set if count < 7 start otherwise space-between  */}
        {state === ViewTypes.Block ? <Row gutter={34} justify='start'>
            <Col span={3}>
                <CreateNewProjectButton />
            </Col>
            <Col span={3}>
                <ProjectActionPopover title={<ProjectActionTitle />} content={<ProjectActionContent />}>
                    <ProjectButton project={{color: 'red', name: 'Knowledge Mode', type: 'public', dateTime: '2022.09.05 18:03'}} />
                </ProjectActionPopover>
            </Col>
        </Row> : <Row gutter={[0, 16]}>
            <Col span={24}>
                <CreateNewProjectButton fullWidth block />
            </Col>
            <Col span={24}>
                <ProjectActionPopover fullWidth  title={<ProjectActionTitle />} content={<ProjectActionContent />}>
                    <ProjectButton fullWidth block project={{color: 'red', name: 'Knowledge Mode', type: 'public', dateTime: '2022.09.05 18:03'}} />
                </ProjectActionPopover>
            </Col>
        </Row>}
    </>
}