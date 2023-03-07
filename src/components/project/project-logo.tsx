import styled, { css } from "styled-components";
import { FullWidth, ProjectButtonContent } from "types/project";
import { ProjectIcon } from "./project-icon";

import { ReactComponent as PublicProject } from '../icons/public-project.svg';

interface WrapperProps extends FullWidth {
    bgColor: string;
}

const TypeIcon = styled.div<FullWidth>`
    background: rgba(242, 242, 242, 0.7);
    border: 0.5px solid #FFFFFF;
    box-shadow: 0px 10px 10px rgba(111, 111, 111, 0.2);
    border-radius: 4px;
    position: absolute;

    ${(props) => props.fullWidth ? css`
        left: 20px;
        bottom: 18px;
    ` : css`
        left: 38px;
        top: 5px;
    `}
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div<WrapperProps>`
    border-radius: 8px;
    background-color: ${props => props.bgColor || "transparent"};
    border: 0.3px solid #414141;
    vertical-align: middle;
    position: relative;
`;

const Inner = styled.div<FullWidth >`
    line-height: 1;
    ${(props) => props.fullWidth ? css`
        padding: 5px 6px;
    ` : css`
        padding: 17px 14px;
    `}
`;

export const ProjectLogo = ({ project, fullWidth }: ProjectButtonContent) => <div style={{ display: 'flex', justifyContent: 'center' }}>
<Wrapper bgColor={project.color} fullWidth={fullWidth}>
    <Inner fullWidth={fullWidth}>
        <ProjectIcon size={fullWidth ? 15 : 25} icon={project.icon} />
    </Inner>
    {project.type === 'public' && <TypeIcon fullWidth={fullWidth}>{project.type === 'public' ? <PublicProject /> : undefined}</TypeIcon>}
</Wrapper>
</div>