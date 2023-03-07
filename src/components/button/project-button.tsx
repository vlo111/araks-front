import { Button as Component, ButtonProps, Space } from "antd"
import styled, { css } from "styled-components"

import { COLORS, VARIABLES } from "../../helpers/constants";
import VerticalSpace from "../space/vertical-space";
import { ReactComponent as DotsVertical } from 'components/icons/dots-vertical.svg';

import { LongTitle, MenuText, Text } from "../typography";
import { ProjectActionPopover } from "components/popover";
import { ProjectActionTitle } from "pages/projects/components/project-action-title";
import { ProjectActionContent } from "pages/projects/components/project-action-content";
import { FullWidth, ProjectButtonContent } from "types/project";
import { ProjectLogo } from "components/project/project-logo";

type ProjectButtonDraw = ButtonProps & ProjectButtonContent & {
    onOpenProject: () => void
}

const DotsWrapper = styled.div<FullWidth>`
    & {
        position: relative;

        ${(props) => props.fullWidth ? css`
            
        ` : css`
            
            left: 90px;
            bottom: 145px;
            height: 30px;
            width: 15px;
            padding: 5px;
            border-radius: 8px;
        `}

        &:hover, &:active {
            border-color: transparent;
            background-color: rgba(35, 47, 106, 0.1);
        }

        circle {
            fill: #F2F2F2;
            font-size: 20px;
        }
    }
`;

const ButtonContent = ({ project, fullWidth }: ProjectButtonContent) => 
<Space 
    size={fullWidth ? 'middle' : 0} 
    direction={fullWidth ? 'horizontal' : 'vertical'} 
    style={fullWidth ? { display: 'flex', justifyContent: 'space-between', width: '100%' } : {}}>
    <VerticalSpace size={fullWidth ? 'middle' : 8} direction={fullWidth ? 'horizontal' : 'vertical'}>
        <ProjectLogo project={project} fullWidth={fullWidth} />
        {project.name.length > VARIABLES.MAX_PROJECT_TITLE_LENGTH && !fullWidth 
            ? <LongTitle className="button-content__text" name={project.name} /> 
            : <Text className="button-content__text">{project.name}</Text>}
    </VerticalSpace>
    <Space style={{ width: '100%', display: 'flex', alignItems: 'center' }} direction={fullWidth ? 'horizontal' : 'vertical'}>
        <MenuText className="button-content__text">{project.dateTime}</MenuText>
        <ProjectActionPopover align={{ offset: [-20, -5] }} title={<ProjectActionTitle />} content={<ProjectActionContent projectId={project.id} folderId={project.folderId} />}>
            <DotsWrapper fullWidth={fullWidth}><DotsVertical className="more-dots" /></DotsWrapper>
        </ProjectActionPopover>
    </Space>
</Space>;

const StyledButton = styled(({ fullWidth, ...props }) => <Component {...props} />)`
    &.ant-btn-default {
        background: transparent;
        line-height: 22px;

        ${(props: Omit<ProjectButtonDraw, 'project'>) => props.fullWidth ? css`
            border: none;
            border-bottom: 1px solid #C3C3C3;
            border-radius: 0;
            padding: 5px 20px;
        ` : css`
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
        
        &:hover, &:active {
            border-color: transparent;
            background-color: rgba(35, 47, 106, 0.1);

            .more-dots circle {
                fill: ${COLORS.PRIMARY.BLUE};
            }
        }
    }
`;

export const ProjectButton = ({ project, fullWidth, onOpenProject, ...props }: ProjectButtonDraw) => {
  return  <StyledButton
    {...props}
    onDoubleClick={onOpenProject}
    fullWidth={ fullWidth }
    children={<ButtonContent project={project} fullWidth={fullWidth} />} />;
}