import { Row } from 'antd';
import styled from 'styled-components';
import { InfoPanel } from '../../components/profile/info-panel';
import { EditWrapper } from '../../components/profile/edit/wrapper';
import { useGetProjects } from '../../api/projects/use-get-projects';

const Wrapper = styled(Row)`
  height: 100%;

  .ant-spin {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

export const Profile = () => {
  const {
    data: { data: projects },
    isInitialLoading: loading,
  } = useGetProjects({
    page: 1,
    size: 1,
    sortField: 'updated_at',
    sortOrder: 'DESC',
  });

  return (
    <Wrapper>
      <InfoPanel loading={loading} count={projects?.count} />
      <EditWrapper loading={loading} />
    </Wrapper>
  );
};
