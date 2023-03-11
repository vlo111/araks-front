import styled, { css } from "styled-components";
import { Button as ButtonComponent } from "antd";

import { COLORS, DEFAULT_COLOR, DEFAULT_ICON, PATHS } from "helpers/constants";
import Icon from "components/icon";
import { useNavigate, useParams } from "react-router-dom";
import { useManageProject, URL_UPDATE_PROJECT } from "api/projects/use-manage-project";
import { CreateOverviewFormData, ProjectFullInfo, RequestTypes } from "api/types";
import { useIsXXlScreen } from "hooks/use-breakpoint";

const Button = styled(ButtonComponent)`
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    border: none;
`;

type WrapperProp = {
    color?: string;
    isXXl?: boolean;
};

const Wrapper = styled.div<WrapperProp>`
    ${props => props.isXXl ? css`
        width: 160px;
        height: 144px;
        padding: 0;
    ` : css`
        width: 120px;
        height: 108px;
        padding: 10px;
    `}
    background: ${props => props.color || '#EFEFEF'};
    border-radius: 8px;

    .manage {
        display: none;
        ${props => props.isXXl ? css`
            width: 160px;
            height: 144px;
            padding: 39px 12px;
            gap: 10px;
        ` : css`
            width: 120px;
            height: 108px;
            padding: 10px;
            gap: 5px;
        `}
        
        position: absolute;
        top: 0;
        left: 0;
    }

    &:hover {
        opacity: 0.5;

        .manage {
            display: flex;
            flex-direction: column;
        }
    }

    
`;

type InnerProp = {
    iconToShow?: string;
    isXXl?: boolean;
};

const Inner = styled.div<InnerProp>`
    margin: ${props => props.iconToShow ? (props.isXXl ? '43px 49px' : '18px 28px') : '43px 19px'};
`;

type Props = {
    project?: ProjectFullInfo;
};

export const ViewColorIcon = ({ project }: Props) => {
    const navigate = useNavigate();
    const isXXl = useIsXXlScreen();
    const params = useParams();

    const { mutate } = useManageProject(URL_UPDATE_PROJECT.replace(':id', params.id || ''), RequestTypes.Put);

    const resetIconAndColor = () => {
        mutate({
            title: project?.title,
            description: project?.description,
            privacy: project?.privacy,
            color: DEFAULT_COLOR,
            icon: DEFAULT_ICON,
        } as CreateOverviewFormData);
    }

    return <Wrapper color={project?.color} isXXl={isXXl}>
        <Inner iconToShow={project?.icon} isXXl={isXXl}>
            <Icon color={COLORS.PRIMARY.GRAY} icon={project?.icon || 'araks'} size={isXXl ? 62 : 46} />
            <div className="manage">
                <Button block onClick={() => navigate(PATHS.PROJECT_UPDATE.replace(':id', params.id || ''))}>Edit</Button>
                <Button block onClick={resetIconAndColor}>Reset</Button>
            </div>
        </Inner>
    </Wrapper>
}