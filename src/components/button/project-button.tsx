import { useCallback, useState } from 'react';
import { Button as Component, ButtonProps, Space } from 'antd';
import styled, { css } from 'styled-components';

import { COLORS, screenSize, VARIABLES } from 'helpers/constants';
import { ReactComponent as DotsVertical } from 'components/icons/dots-vertical.svg';

import { LongTitle, MenuText, Text } from '../typography';
import { ProjectActionPopover } from 'components/popover';
import { ProjectActionContent } from 'pages/projects/components/project-action-content';
import { FullWidth, ProjectButtonContent } from 'types/project';
import { ProjectLogo } from 'components/project/project-logo';
import { VerticalSpace } from 'components/space/vertical-space';
import { DeleteProjectModal } from 'components/modal/delete-project-modal';
import { ProjectActionTitle } from '../../pages/projects/components/project-action-title';
import { useGetProjectInfo } from '../../api/projects/use-get-project-info';
import { useIsPublicPage } from 'hooks/use-is-public-page';

type ProjectButtonDraw = ButtonProps &
  ProjectButtonContent & {
    onOpenProject: () => void;
  };

const DotsWrapper = styled.div<FullWidth>`
  & {
    position: relative;

    ${(props) =>
      props.fullWidth
        ? css``
        : css`
            height: 30px;
            width: 15px;
            padding: 5px;
            border-radius: 8px;
            left: 90px;
            bottom: 145px;
            @media (max-width: ${screenSize.xxl}) {
              left: 88px;
              bottom: 138px;
            }
          `}

    &:hover, &:active {
      border-color: transparent;
      background-color: rgba(35, 47, 106, 0.1);
    }

    circle {
      fill: #f2f2f2;
      font-size: 20px;
    }
  }
`;

const ButtonContent = ({ project, fullWidth }: ProjectButtonContent) => {
  const isPublicPage = useIsPublicPage();

  const [isClicked, setIsClicked] = useState(false);
  const { data: projectData } = useGetProjectInfo({ id: project.id }, { enabled: !!project.id && isClicked });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsClicked(false);
    setIsDeleteModalOpen(true);
  }, [setIsClicked]);

  return (
    <Space
      size={fullWidth ? 'middle' : 0}
      direction={fullWidth ? 'horizontal' : 'vertical'}
      style={fullWidth ? { display: 'flex', justifyContent: 'space-between', width: '100%' } : {}}
    >
      <VerticalSpace size={fullWidth ? 'middle' : 8} direction={fullWidth ? 'horizontal' : 'vertical'}>
        <ProjectLogo project={project} fullWidth={fullWidth} />
        {project.name.length > VARIABLES.MAX_PROJECT_TITLE_LENGTH && !fullWidth ? (
          <LongTitle className="button-content__text" name={project.name} />
        ) : (
          <Text className="button-content__text">{project.name}</Text>
        )}
      </VerticalSpace>
      <Space
        style={{ width: '100%', display: 'flex', alignItems: 'center' }}
        direction={fullWidth ? 'horizontal' : 'vertical'}
      >
        <MenuText className="button-content__text">{project.dateTime}</MenuText>
        <ProjectActionPopover
          align={{ offset: [-20, -5] }}
          title={
            <ProjectActionTitle
              comments={projectData?.commentCount}
              likes={projectData?.favoriteCount}
              views={projectData?.views}
            />
          }
          open={isClicked}
          onOpenChange={(open: boolean) => {
            !open && setIsClicked(false);
            return open;
          }}
          content={
            !isPublicPage ? (
              <ProjectActionContent
                projectId={project.id}
                folderId={project.folderId}
                setIsDeleteModalOpen={openModal}
              />
            ) : (
              <></>
            )
          }
        >
          <DotsWrapper fullWidth={fullWidth} onClick={() => setIsClicked((prev) => !prev)}>
            <DotsVertical className="more-dots" />
          </DotsWrapper>
        </ProjectActionPopover>
        {!isPublicPage && (
          <DeleteProjectModal
            isModalOpen={isDeleteModalOpen}
            setIsModalOpen={setIsDeleteModalOpen}
            folderId={project.folderId}
            projectId={project.id}
          />
        )}
      </Space>
    </Space>
  );
};

const StyledButton = styled(({ fullWidth, ...props }) => <Component {...props} />)`
  &.ant-btn-default {
    background: transparent;
    line-height: 22px;

    ${(props: Omit<ProjectButtonDraw, 'project'>) =>
      props.fullWidth
        ? css`
            border: none;
            border-bottom: 1px solid #c3c3c3;
            border-radius: 0;
            padding: 5px 20px;
          `
        : css`
            border-color: transparent;
            width: 202px;
            height: 150px;
            padding: 20px 20px 9px;
            display: flex;
            justify-content: center;
          `}

    .button-content__text {
      color: ${COLORS.PRIMARY.GRAY_DARK};
    }

    &:hover,
    &:active {
      border-color: transparent;
      background-color: rgba(35, 47, 106, 0.1);

      .more-dots circle {
        fill: ${COLORS.PRIMARY.BLUE};media
      }
    }
  }
`;

export const ProjectButton = ({ project, fullWidth, onOpenProject, ...props }: ProjectButtonDraw) => {
  return (
    <StyledButton {...props} onDoubleClick={onOpenProject} fullWidth={fullWidth}>
      <ButtonContent project={project} fullWidth={fullWidth} />
    </StyledButton>
  );
};
