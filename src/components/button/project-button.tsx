import { Button as Component, ButtonProps } from "antd"
import styled from "styled-components"
import Icon from '@ant-design/icons';

import { COLORS } from "../../helpers/constants";
import VerticalSpace from "../space/vertical-space";
import { ReactComponent as AraksSmall } from '../icons/araks-small.svg';
import { ReactComponent as PublicProject } from '../icons/public-project.svg';
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { MenuText, Text } from "../typography";

type ProjectButtonDraw = ButtonProps & {
    project: {
        color: string;
        dateTime: string;
        // icon: string;
        name: string;
        type: 'public' | 'shared';
    }
}

interface WrapperProps {
    bgColor: string;
}

const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={AraksSmall} {...props} />
  );

const Wrapper = styled.div<WrapperProps>`
    border-radius: 8px;
    background-color: ${props => props.bgColor || "green"};
    width: 60px;
    height: 60px;
    padding: 17px 0;
    vertical-align: middle;
`;

const TypeIcon = styled.div`
    background: rgba(242, 242, 242, 0.7);
    border: 0.5px solid #FFFFFF;
    box-shadow: 0px 10px 10px rgba(111, 111, 111, 0.2);
    border-radius: 4px;
    position: relative;
    left: 40px;
    bottom: 40px;
    width: 14px;
    height: 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 3px;
`;

const ButtonContent = ({ project }: Pick<ProjectButtonDraw, 'project'>) => <VerticalSpace size="small">
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Wrapper bgColor={project.color}>
            <HeartIcon style={{ fontSize: '26px' }} />
            <TypeIcon>{project.type === 'public'? <PublicProject /> : <PublicProject />}</TypeIcon>
        </Wrapper>
    </div>
    <Text className="button-content__text">{project.name}</Text>
    <MenuText className="button-content__text">{project.dateTime}</MenuText>
</VerticalSpace>;

export const ProjectButton = styled(({ project, ...props }: ProjectButtonDraw) => 
    <Component {...props} children={<ButtonContent project={project} />} />)`
        &.ant-btn-default {
            background: transparent;
            border-color: transparent;
            width: 200px;
            height: 150px;
            padding: 20px 20px 10px;

            .button-content__text {
                color: ${COLORS.PRIMARY.GRAY_DARK};
            } 
            
            &:hover, &:active {
                border-color: transparent;
                background-color: rgba(35, 47, 106, 0.1);
            }
        }
`;