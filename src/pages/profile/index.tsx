import { Spin } from 'antd';
import { InfoPanel } from 'components/profile/info-panel';
import { EditWrapper } from 'components/profile/edit/wrapper';
import { Wrapper } from './wrapper';
import { useGetProject } from 'api/projects/use-get-project-count';

export const Profile = () => {
  const { data } = useGetProject();

  return (
    <Wrapper>
      <Spin spinning={false}>
        <InfoPanel info={data} />
        <EditWrapper />
      </Spin>
    </Wrapper>
  );
};
