import { getProjectById } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"

export default function EditProjectView() {

    const { projectID } = useParams()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editProject', projectID], //para tener un identificador dinamico
        queryFn: () => getProjectById(projectID!),
        retry: false,
    })

    //console.log('EditProjectView error', error)

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to={'error'}/>


    return (
        <div>EditProjectView</div>
    )
}
