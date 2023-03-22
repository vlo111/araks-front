import { Col, ColProps, PaginationProps, Row, RowProps, Spin } from 'antd';
import dayjs from 'dayjs';
import { useGetProjects } from 'api/projects/use-get-projects';
import { CreateNewProjectButton, ProjectButton } from 'components/button';
import { TitleSeparator } from 'components/typography';
import { useSort } from 'context/sort-context';
import { useView, ViewTypes } from 'context/view-context';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { ProjectListResponse } from 'types/project';
import { FolderAction, folderReducer, initData } from './folder/folders';
import { propsProjectBlockView, propsProjectGridView } from './constants';
import { ProjectViewModal } from 'components/modal/project-view-modal';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'helpers/constants';

type Props = {
  projectsUrl?: string;
  title?: string;
  showCreate?: boolean;
};

export const MyProjects = ({ projectsUrl, title, showCreate = true }: Props) => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<string | undefined>();
  const { state } = useView();
  const { state: sortState } = useSort();

  const [orderName, order] = useMemo(() => sortState?.split(' ') || [], [sortState]);
  const [folderState, dispatch] = useReducer(folderReducer, { ...initData, size: 13 });

  useEffect(() => {
    if (orderName && order) {
      dispatch({ type: FolderAction.CHANGE_SORT, sortField: orderName, sortOrder: order });
    }
  }, [order, orderName]);

  const {
    data: { data, folder },
    isLoading,
  } = useGetProjects(folderState, projectsUrl);

  const onPaginationChange: PaginationProps['onChange'] = useCallback((page: number) => {
    dispatch({ type: FolderAction.CHANGE_PAGE, page });
  }, []);

  const paginationProps = useMemo(
    () =>
      data?.count
        ? {
            onChange: onPaginationChange,
            total: data.count,
            defaultPageSize: 13,
            current: folderState.page,
          }
        : undefined,
    [data?.count, folderState.page, onPaginationChange]
  );

  const dataToDraw = useMemo(() => (state === ViewTypes.Block ? propsProjectBlockView : propsProjectGridView), [state]);

  const listTitle = title || (folder ? folder.title : null) || 'All Projects';

  return (
    <Spin spinning={isLoading}>
      <TitleSeparator name={listTitle} paginationProps={paginationProps} />
      <Row {...(dataToDraw.row as RowProps)} justify="start">
        {showCreate && (
          <Col {...(dataToDraw.col as ColProps)}>
            <CreateNewProjectButton {...dataToDraw.newProject} onClick={() => navigate(PATHS.PROJECT_CREATE)} />
          </Col>
        )}
        {data?.rows?.map((item: ProjectListResponse) => (
          <Col key={item.id} {...(dataToDraw.col as ColProps)}>
            <ProjectButton
              onOpenProject={() => {
                setProjectData(item.id);
              }}
              project={{
                id: item.id,
                icon: item.icon,
                color: item.color,
                name: item.title,
                folderId: item.folder_id,
                type: item.privacy,
                dateTime: dayjs(item.updated_at).format('YYYY-MM-DD HH:mm'),
              }}
              {...dataToDraw.projectButton}
            />
          </Col>
        ))}
      </Row>
      {projectData && (
        <ProjectViewModal isModalOpen={!!projectData} setIsModalOpen={setProjectData} projectId={projectData} />
      )}
    </Spin>
  );
};
