import AddTaskModal from "@/components/tasks/AddTaskModal"
import { getProjectById } from "@/services/ProjectApi"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useNavigate, useParams } from "react-router-dom"

export default function DetailProjectView() {

    const navigate = useNavigate()
    const { projectID } = useParams()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editProject', projectID], //para tener un identificador dinamico
        queryFn: () => getProjectById(projectID!),
        retry: false,
    })

    if (isLoading) return 'Cargando...'
    if (isError) return <Navigate to={'error'} />
    if (data) return (
        <>
            <h1 className="text-5xl font-black">{data.records.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.records.description}</p>

            <nav className="my-5 flex gap-3">
                <button type="button"
                    onClick={() => navigate('?newTask=true')} 
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3
                     text-white text-xl font-bold cursor-pointer transition-colors"
                     >
                    Agregar Tarea
                </button>
            </nav>

            <AddTaskModal projectID={projectID!}/>
        </>
    )
}
