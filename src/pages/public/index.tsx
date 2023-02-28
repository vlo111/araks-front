import { GET_PROJECTS_PUBLIC_LIST } from "api/projects/use-get-projects";
import { ProjectList } from "components/layouts/project-list"
import { MyProjects } from "pages/projects/components/my-projects"

export const Public = () => {
    return <ProjectList>
        <div>
            <MyProjects title='Available to me' projectsUrl={GET_PROJECTS_PUBLIC_LIST} showCreate={false} />
        </div>
    </ProjectList>
}