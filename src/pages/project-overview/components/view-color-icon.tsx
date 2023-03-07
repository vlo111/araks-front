import { Button as ButtonComponent } from "antd";
import styled from "styled-components";

import { COLORS } from "helpers/constants";
import Icon from "components/icon";

const Button = styled(({ color, iconToShow, ...props}) => <ButtonComponent {...props} />)`
    padding: 0;
    width: 160px;
    height: 144px;
    border: 1px dashed #808080;
    background: ${props => props.color || '#EFEFEF'};
    border-radius: 8px;
`;

type WrapperProp = {
    iconToShow?: string;
};

const Wrapper = styled.div<WrapperProp>`
    margin: ${props => props.iconToShow ? '43px 49px' : '43px 19px'};

`;

type Props = {
    color: string;
    icon: string;
};

export const ViewColorIcon = ({ color, icon }: Props) => {
    return <Button type="dashed" color={color}>
        <Wrapper iconToShow={icon}>
            <Icon color={COLORS.PRIMARY.GRAY} icon={icon} size={62} />
        </Wrapper>
    </Button>
}