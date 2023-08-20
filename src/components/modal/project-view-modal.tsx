import { ReactComponent as LeftCircle } from 'components/icons/right-button.svg';
import { ReactComponent as DotsVertical } from 'components/icons/dots-vertical.svg';
import { ReactComponent as Public } from 'components/icons/public.svg';

import { Button } from 'components/button';
import { MenuText, Text } from 'components/typography';
import styled from 'styled-components';
import { Col, Drawer, Row, Space } from 'antd';
import { PATHS } from 'helpers/constants';
import { ProjectLogo } from 'components/project/project-logo';
import { ProjectButtonContent, ProjectList, ProjectStatisticsType } from 'types/project';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ProjectStatistics } from 'components/project/project-statistics';
import dotImage from '../../pages/project-visualisation/components/icons/dots.svg';
import React, { Dispatch, useCallback, useState } from 'react';
import { ProjectActionContent } from '../../pages/projects/components/project-action-content';
import { ProjectActionPopover } from '../popover';
import { ProjectActionTitle } from '../../pages/projects/components/project-action-title';
import { DeleteProjectModal } from './delete-project-modal';
import { Graph } from '@antv/g6';
import { ProjectInfoReturnData } from '../../api/types';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: undefined | string) => void;
  projectData: ProjectInfoReturnData;
  graph: { destroy: (() => void) | null; graph: Graph | null };
  setGraph: Dispatch<React.SetStateAction<{ destroy: (() => void) | null; graph: Graph | null }>>;
};

type TitleProps = ProjectButtonContent &
  ProjectStatisticsType & {
    handleCancel: () => void;
    isClicked: boolean;
    setClicked: Dispatch<React.SetStateAction<boolean>>;
    openModal: () => void;
  };

const ProjectWrapModal = styled(Drawer)`
  & {
    margin: 0;
    margin-left: auto;
    position: static;
    min-height: 100vh;
    height: 100%;

    &.ant-drawer-content {
      background: #fdfdfd;
      box-shadow: -10px 0px 10px rgba(111, 111, 111, 0.1);
      border-radius: 4px;
      padding: 0;

      .ant-drawer-header {
        padding: 0 16px 0 72px;
        margin: 0;

        .back-link {
          position: absolute;
          font-size: 40px;
          left: -20px;
          top: 33px;
          cursor: pointer;
        }
      }

      .ant-drawer-body {
        overflow: unset;
        padding: 0;

        .project-content {
          height: calc(100vh - 270px);
        }
      }
    }
  }
`;

const TitleWrapper = styled(Space)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104px;
  background: transparent;
`;

const StyledContainer = styled.div`
  & canvas {
    background: url(${dotImage});
  }
`;

const FooterWrapper = styled.div`
  height: 40px;
  background: linear-gradient(119.84deg, rgba(255, 255, 255, 0.5) 88.78%, rgba(255, 255, 255, 0.49) 165.43%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 42px 0;
`;

const StyledDotWrapper = styled.div`
  padding: 4px;

  &:hover {
    border-color: transparent;
    background-color: rgba(35, 47, 106, 0.1);
    padding: 4px;
    border-radius: 8px;
  }
`;

const Title = ({
  project,
  comments,
  likes,
  views,
  size,
  handleCancel,
  isClicked,
  setClicked,
  openModal,
}: TitleProps) => (
  <>
    <LeftCircle className="back-link" onClick={handleCancel} />
    <TitleWrapper>
      <Space>
        <ProjectLogo project={project} />
        <Text>{project.name}</Text>
      </Space>
      <Space size={30}>
        <ProjectStatistics comments={comments} likes={likes} views={views} size={size} />
        <Public width="16px" style={{ marginTop: '4px' }} />
        <ProjectActionPopover
          align={{ offset: [-20, -5] }}
          title={<ProjectActionTitle />}
          open={isClicked}
          onOpenChange={(open: boolean) => {
            !open && setClicked(false);
            return open;
          }}
          content={
            <ProjectActionContent projectId={project.id} folderId={project.folderId} setIsDeleteModalOpen={openModal} />
          }
        >
          <StyledDotWrapper onClick={() => setClicked(true)}>
            <DotsVertical />
          </StyledDotWrapper>
        </ProjectActionPopover>
      </Space>
    </TitleWrapper>
  </>
);

export const ProjectViewModal = ({ isModalOpen, setIsModalOpen, projectData, graph, setGraph }: Props) => {
  const navigate = useNavigate();

  const [isClicked, setClicked] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setIsModalOpen(undefined);
    if (graph.destroy) {
      setGraph({ destroy: null, graph: null });
      graph.destroy();
    }
  };

  const openModal = useCallback(() => {
    setClicked(false);
    setIsDeleteModalOpen(true);
  }, [setClicked]);

  const project: ProjectList = projectData
    ? {
        id: projectData.id,
        color: projectData.color,
        name: projectData.title,
        folderId: projectData.folder_id,
        type: projectData.privacy,
        dateTime: dayjs(projectData.updated_at).format('YYYY-MM-DD HH:mm'),
        icon: projectData.icon,
      }
    : ({} as ProjectList);

  return (
    <>
      <ProjectWrapModal
        open={isModalOpen}
        title={
          project.id ? (
            <Title
              handleCancel={handleCancel}
              project={project}
              size={20}
              comments={projectData?.commentCount || 0}
              likes={projectData?.favoriteCount || 0}
              views={projectData?.views || 0}
              isClicked={isClicked}
              setClicked={setClicked}
              openModal={openModal}
            />
          ) : (
            ''
          )
        }
        footer={
          <FooterWrapper>
            <Row justify="center">
              <Col span={12}>
                <Button
                  block
                  type="primary"
                  onClick={() => navigate(PATHS.PROJECT_OVERVIEW.replace(':id', project.id))}
                >
                  <MenuText strong style={{ color: '#ffffff' }}>
                    OPEN PROJECT
                  </MenuText>
                </Button>
              </Col>
            </Row>
          </FooterWrapper>
        }
        closable={false}
        placement="right"
        width="50vw"
      >
        <StyledContainer className="project-content" id={'juJSlsfk'} />
      </ProjectWrapModal>
      <DeleteProjectModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        folderId={project.folderId}
        projectId={project.id}
        closePreview={handleCancel}
      />
    </>
  );
};
