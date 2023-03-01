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
    position: relative;

    ${(props) => props.fullWidth ? css`
        left: 23px;
        bottom: 26px;
        width: 10px;
        height: 10px;
    ` : css`
        left: 40px;
        bottom: 40px;
        width: 16px;
        height: 16px;
        padding: 3px;
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
    ${(props) => props.fullWidth ? css`
        width: 30px;
        height: 30px;
        padding: 3px 0;
    ` : css`
        width: 60px;
        height: 60px;
        padding: 17px 0;
    `}
    vertical-align: middle;
`;

export const ProjectLogo = ({ project, fullWidth }: ProjectButtonContent) => <div style={{ display: 'flex', justifyContent: 'center' }}>
<Wrapper bgColor={project.color} fullWidth={fullWidth}>
    <ProjectIcon style={{ fontSize: fullWidth ? '15px' : '26px' }} />
    {project.type === 'public' && <TypeIcon fullWidth={fullWidth}>{project.type === 'public' ? <PublicProject /> : undefined}</TypeIcon>}
</Wrapper>
</div>