import { Space } from "antd";
import { HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { ReactComponent as DotsVertical } from 'components/icons/dots-vertical.svg';
import { ReactComponent as MessageOutlined } from 'components/icons/message-outlined.svg';
import { ReactComponent as Public } from 'components/icons/public.svg';
import { Text } from "../../../components/typography";
import { COLORS } from "helpers/constants";
import styled from "styled-components";

const TitleWrapper = styled(Space)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`;

export const ProjectActionTitle = () => {

    return <TitleWrapper>
        <DotsVertical />
        <Space size={6}><HeartOutlined style={{ height: '12px', color: COLORS.PRIMARY.BLUE }} /><Text>999</Text></Space>
        <Space size={6}><MessageOutlined /><Text>999</Text></Space>
        <Space size={6}><EyeOutlined style={{ height: '12px', color: COLORS.PRIMARY.BLUE }} /><Text>999</Text></Space>
        <Public width='16px' style={{ marginTop: '4px' }} />
    </TitleWrapper>
}