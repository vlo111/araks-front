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
import { Graph } from '@antv/g6';

type Props = {
  projectsUrl?: string;
  title?: string;
  showCreate?: boolean;
  isPublic?: boolean;
};

export const MyProjects = ({ projectsUrl, title, showCreate = true, isPublic = false }: Props) => {
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [graph, setGraph] = useState<{ destroy: (() => void) | null; graph: Graph | null }>({
    destroy: null,
    graph: null,
  });

  const { state } = useView();
  const { state: sortState } = useSort();

  const [orderName, order] = useMemo(() => sortState?.split(' ') || [], [sortState]);
  const [folderState, dispatch] = useReducer(folderReducer, { ...initData, size: 13 });

  useEffect(() => {
    if (orderName && order) {
      dispatch({ type: FolderAction.CHANGE_SORT, sortField: orderName, sortOrder: order });
    }
  }, [order, orderName, projectId]);

  const {
    data: { data, folder },
    isInitialLoading,
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
    <Spin spinning={isInitialLoading}>
      <TitleSeparator name={listTitle} paginationProps={paginationProps} />
      <Row {...(dataToDraw.row as RowProps)} justify="start">
        {showCreate && (
          <Col {...(dataToDraw.col as ColProps)}>
            <CreateNewProjectButton
              {...dataToDraw.newProject}
              onClick={() =>
                navigate(PATHS.PROJECT_CREATE, { state: { folderId: folder?.id, folderTitle: folder?.title } })
              }
            />
          </Col>
        )}
        {data?.rows?.map((item: ProjectListResponse) => (
          <Col key={item.id} {...(dataToDraw.col as ColProps)}>
            <ProjectButton
              onOpenProject={() => {
                if (item.id) setProjectId(item.id);
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
      {projectId && (
        <ProjectViewModal
          isModalOpen={!!projectId}
          setIsModalOpen={setProjectId}
          projectId={projectId}
          graph={graph}
          setGraph={setGraph}
          isPublic={isPublic}
        />
      )}
    </Spin>
  );
};
