import { Space } from 'antd';
import { ReactComponent as DotsVertical } from 'components/icons/dots-vertical.svg';
import { ReactComponent as Public } from 'components/icons/public.svg';
import styled from 'styled-components';
import { ProjectStatistics } from 'components/project/project-statistics';

const TitleWrapper = styled(Space)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 26px;
`;

type Props = {
  comments?: number;
  likes?: number;
  views?: number;
};

export const ProjectActionTitle = ({ comments = 0, likes = 0, views = 0 }: Props) => {
  return (
    <TitleWrapper>
      <DotsVertical />
      <ProjectStatistics comments={comments} likes={likes} views={views} size={20} />
      <Public width="16px" style={{ marginTop: '4px' }} />
    </TitleWrapper>
  );
};
