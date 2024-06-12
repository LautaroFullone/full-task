import TaskCreateModal from "@/components/tasks/TaskCreateModal"
import TaskDetailModal from "@/components/tasks/TaskDetailModal"
import TaskEditorShield from "@/components/tasks/TaskEditorShield"
import TasksList from "@/components/tasks/TasksList"
import useAuth from "@/hooks/useAuth"
import { getProjectById } from "@/services/ProjectApi"
import { isManager } from "@/utils/policies"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

export default function DetailProjectView() {

    const navigate = useNavigate()
    const { projectID } = useParams()

    const { data: user, isLoading: isUserLoading } = useAuth()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['getProject', projectID], //para tener un identificador dinamico
        queryFn: () => getProjectById(projectID!),
        retry: false,
    })

    //almacena el resultado de la funcion cuando alguna de las dependencias cambia
    const canEdit = useMemo(() => data?.records.manager === user?._id, [data, user])

    if(isLoading && isUserLoading) return 'Cargando...'
    if(isError) return <Navigate to={'error'} />
    if(data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.records.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.records.description}</p>

            {
                isManager(data.records.manager, user._id) &&
                <nav className="my-5 flex gap-3">
                    <button type="button"
                        onClick={() => navigate('?newTask=true')}
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3
                            text-white text-xl font-bold cursor-pointer transition-colors">
                        Agregar Tarea
                    </button>

                    <Link to={'team'}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3
                            text-white text-xl font-bold cursor-pointer transition-colors">
                        Colaboradores
                    </Link>
                </nav>
            }

            <TasksList tasks={data.records.tasks}
                canUserEdit={canEdit}
                projectID={projectID!} />

            <TaskCreateModal projectID={projectID!} />

            <TaskEditorShield projectID={projectID!} />

            <TaskDetailModal projectID={projectID!} />

        </>
    )
}
