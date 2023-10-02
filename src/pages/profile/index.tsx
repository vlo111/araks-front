import { useState } from 'react';
import { Spin } from 'antd';
import { InfoPanel } from 'components/profile/info-panel';
import { EditWrapper } from 'components/profile/edit/wrapper';
import { useGetProjects } from 'api/projects/use-get-projects';
import { Wrapper } from './wrapper';
import { UserContext } from 'context/user-context';

export const Profile = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

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
    <UserContext.Provider value={{ avatar, setAvatar }}>
      <Wrapper>
        <Spin spinning={loading}>
          <InfoPanel count={projects?.count} />
          <EditWrapper />
        </Spin>
      </Wrapper>
    </UserContext.Provider>
  );
};
