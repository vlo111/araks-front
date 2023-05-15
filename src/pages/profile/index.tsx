import { Spin } from 'antd';
import { InfoPanel } from '../../components/profile/info-panel';
import { EditWrapper } from '../../components/profile/edit/wrapper';
import { useGetProjects } from '../../api/projects/use-get-projects';
import { Wrapper } from './wrapper';

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
      <Spin spinning={loading}>
        <InfoPanel count={projects?.count} />
        <EditWrapper />
      </Spin>
    </Wrapper>
  );
};
