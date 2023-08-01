import { URL_UPDATE_PROJECT } from 'api/projects/use-manage-project';
import { RequestTypes, UserProjectRole } from 'api/types';
import { useProject } from 'context/project-context';
import { PATHS } from 'helpers/constants';
import { Navigate, useParams } from 'react-router-dom';
import { ProjectForm } from './form';

export const ProjectUpdate = () => {
  const { projectInfo } = useProject();

  const params = useParams();

  if (projectInfo && projectInfo?.role !== UserProjectRole.Owner) {
    return <Navigate to={PATHS.PROJECT_OVERVIEW.replace(':id', params.id as string)} />;
  }
  return <ProjectForm manageUrl={URL_UPDATE_PROJECT.replace(':id', params.id || '')} type={RequestTypes.Put} />;
};
