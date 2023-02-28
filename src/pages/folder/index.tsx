import { GET_FOLDER_PROJECTS_LIST } from "api/projects/use-get-projects";
import { ProjectList } from "components/layouts/project-list"
import { MyProjects } from "pages/projects/components/my-projects"
import { useParams } from "react-router-dom"

export const Folder = () => {
    const params = useParams();
    return <ProjectList>
        <div>
            <MyProjects projectsUrl={GET_FOLDER_PROJECTS_LIST.replace(':id', params.id || '')} />
        </div>
    </ProjectList>
}