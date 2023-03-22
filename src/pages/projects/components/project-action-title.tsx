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

export const ProjectActionTitle = () => {
  return (
    <TitleWrapper>
      <DotsVertical />
      <ProjectStatistics comments={999} likes={999} views={999} size={12} />
      <Public width="16px" style={{ marginTop: '4px' }} />
    </TitleWrapper>
  );
};
