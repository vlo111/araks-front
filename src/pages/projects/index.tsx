import { ProjectList } from "components/layouts/project-list"
import { Folders } from "./components/folder/folders"
import { MyProjects } from "./components/my-projects"

export const Projects = () => {
    return <ProjectList>
        <div>
            <Folders />
        </div>
        <div>
            <MyProjects />
        </div>
    </ProjectList>
}