import ProjectEditor from "@/components/projects/ProjectEditor"
import { getProjectById } from "@/services/ProjectApi"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"

export default function EditProjectView() {

    const { projectID } = useParams()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editProject', projectID], 
        queryFn: () => getProjectById(projectID!),
        retry: false,
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to={'error'}/>
    if(data) return <ProjectEditor project={data.records} projectID={projectID!}/>
}
