import { Space } from "antd";
import { Text } from "components/typography";
import { COLORS } from "helpers/constants";
import { ProjectStatisticsType } from "types/project";
import { HeartOutlined, EyeOutlined } from '@ant-design/icons';
import { ReactComponent as MessageOutlined } from 'components/icons/message-outlined.svg';

export const ProjectStatistics = ({ comments, likes, views, size }: ProjectStatisticsType) => <Space size={size}>
    <Space size={6}><HeartOutlined style={{ height: '12px', color: COLORS.PRIMARY.BLUE }} /><Text>{likes}</Text></Space>
    <Space size={6}><MessageOutlined /><Text>{comments}</Text></Space>
    <Space size={6}><EyeOutlined style={{ height: '12px', color: COLORS.PRIMARY.BLUE }} /><Text>{views}</Text></Space>
</Space>
