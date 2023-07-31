import { GET_PROJECTS_SHARED } from 'api/projects/use-get-projects';
import { ProjectList } from 'components/layouts/project-list';
import { MyProjects } from 'pages/projects/components/my-projects';

export const Shared = () => {
  return (
    <ProjectList>
      <div>
        <MyProjects title="Available to me" projectsUrl={GET_PROJECTS_SHARED} showCreate={false} />
      </div>
    </ProjectList>
  );
};
