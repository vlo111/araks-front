import { URL_UPDATE_PROJECT } from "api/projects/use-manage-project"
import { RequestTypes } from "api/types"
import { useParams } from "react-router-dom"
import { ProjectForm } from "./form"

export const ProjectUpdate = () => {
    const params = useParams();
    return <ProjectForm manageUrl={URL_UPDATE_PROJECT.replace(':id', params.id || '')} type={RequestTypes.Put} />
}