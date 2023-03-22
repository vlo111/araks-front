import { Spin } from 'antd';
import useGetProject from 'api/projects/use-get-project';
import { useParams } from 'react-router-dom';

export const ProjectScheme = () => {
  const params = useParams();
  const { isLoading } = useGetProject({ id: params.id }, { enabled: !!params.id });
  return (
    <Spin spinning={isLoading}>
      <div>Project Scheme</div>
    </Spin>
  );
};
