import { Button as Component, ButtonProps, Space } from "antd"
import styled, { css } from "styled-components"
import Icon from '@ant-design/icons';

import { COLORS } from "../../helpers/constants";
import VerticalSpace from "../space/vertical-space";
import { ReactComponent as AraksSmall } from '../icons/araks-small.svg';
import { ReactComponent as PublicProject } from '../icons/public-project.svg';
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { MenuText, Text } from "../typography";

export type FullWidth = {
    fullWidth?: boolean;
};

type ProjectButtonDraw = ButtonProps & FullWidth & {
    project: {
        color: string;
        dateTime: string;
        // icon: string;
        name: string;
        type: string;
    };
}

interface WrapperProps extends FullWidth {
    bgColor: string;
}

const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={AraksSmall} {...props} />
  );

const Wrapper = styled.div<WrapperProps>`
    border-radius: 8px;
    background-color: ${props => props.bgColor || "transparent"};
    border: 0.3px solid #414141;
    ${(props) => props.fullWidth ? css`
        width: 30px;
        height: 30px;
        padding: 5px 0;
    ` : css`
        width: 60px;
        height: 60px;
        padding: 17px 0;
    `}
    vertical-align: middle;
`;

const TypeIcon = styled.div<FullWidth>`
    background: rgba(242, 242, 242, 0.7);
    border: 0.5px solid #FFFFFF;
    box-shadow: 0px 10px 10px rgba(111, 111, 111, 0.2);
    border-radius: 4px;
    position: relative;
    ${(props) => props.fullWidth ? css`
        left: 20px;
        bottom: 25px;
        width: 6px;
        height: 6px;
    ` : css`
        left: 40px;
        bottom: 40px;
        width: 14px;
        height: 14px;
        padding: 3px;
    `}
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ButtonContent = ({ project, fullWidth }: Omit<ProjectButtonDraw, 'ButtonProps'>) => 
<Space size={fullWidth ? 'middle' : 4} direction={fullWidth ? 'horizontal' : 'vertical'} style={fullWidth ? { justifyContent: 'space-between', width: '100%' } : {}}>
    <VerticalSpace size={fullWidth ? 'middle' : 12} direction={fullWidth ? 'horizontal' : 'vertical'}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Wrapper bgColor={project.color} fullWidth={fullWidth}>
                <HeartIcon style={{ fontSize: fullWidth ? '15px' : '26px' }} />
                {project.type === 'public' && <TypeIcon fullWidth={fullWidth}>{project.type === 'public' ? <PublicProject /> : undefined}</TypeIcon>}
            </Wrapper>
        </div>
        <Text className="button-content__text">{project.name.length > 19 ? project.name.substring(0, 19) + '...' : project.name}</Text>
    </VerticalSpace>
    <MenuText className="button-content__text">{project.dateTime}</MenuText>
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
            width: 200px;
            height: 150px;
            padding: 20px 20px 10px;
        `}

        .button-content__text {
            color: ${COLORS.PRIMARY.GRAY_DARK};
        } 
        
        &:hover, &:active {
            border-color: transparent;
            background-color: rgba(35, 47, 106, 0.1);
        }
    }
`;

export const ProjectButton = ({ project, fullWidth, ...props }: ProjectButtonDraw) => {
  return  <StyledButton  {...props} fullWidth={ fullWidth } children={<ButtonContent project={project} fullWidth={fullWidth} />} />;
}