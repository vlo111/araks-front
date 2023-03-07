import styled from "styled-components";
import { Button as ButtonComponent } from "antd";

import { COLORS, DEFAULT_COLOR, DEFAULT_ICON, PATHS } from "helpers/constants";
import Icon from "components/icon";
import { useNavigate, useParams } from "react-router-dom";
import { useManageProject, URL_UPDATE_PROJECT } from "api/projects/use-manage-project";
import { CreateOverviewFormData, ProjectFullInfo, RequestTypes } from "api/types";

const Button = styled(ButtonComponent)`
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    border: none;
`;

type WrapperProp = {
    color?: string;
};

const Wrapper = styled.div<WrapperProp>`
    padding: 0;
    width: 160px;
    height: 144px;
    background: ${props => props.color || '#EFEFEF'};
    border-radius: 8px;

    .manage {
        padding: 39px 12px;
        display: none;
        width: 160px;
        height: 144px;
        gap: 10px;
        position: absolute;
        border: 1px solid black;
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
};

const Inner = styled.div<InnerProp>`
    margin: ${props => props.iconToShow ? '43px 49px' : '43px 19px'};
`;

type Props = {
    project?: ProjectFullInfo;
};

export const ViewColorIcon = ({ project }: Props) => {
    const navigate = useNavigate();
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

    return <Wrapper color={project?.color}>
        <Inner iconToShow={project?.icon}>
            <Icon color={COLORS.PRIMARY.GRAY} icon={project?.icon || 'araks'} size={62} />
            <div className="manage">
                <Button block onClick={() => navigate(PATHS.PROJECT_UPDATE.replace(':id', params.id || ''))}>Edit</Button>
                <Button block onClick={resetIconAndColor}>Reset</Button>
            </div>
        </Inner>
    </Wrapper>
}