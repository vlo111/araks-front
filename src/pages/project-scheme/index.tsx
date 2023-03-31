import { Spin } from 'antd';
import { useGetProject } from 'api/projects/use-get-project';
import { useParams } from 'react-router-dom';

export const ProjectScheme = () => {
  const params = useParams();
  const { isInitialLoading } = useGetProject({ id: params.id }, { enabled: !!params.id });
  return (
    <Spin spinning={isInitialLoading}>
      <div>Project Scheme</div>
    </Spin>
  );
};
