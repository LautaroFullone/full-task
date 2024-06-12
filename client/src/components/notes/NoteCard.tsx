import useAuth from "@/hooks/useAuth"
import { deleteNote } from "@/services/NoteApi"
import { Note, Project, Task } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { toast } from "react-toastify"

interface NoteCardProps {
    note: Note
    projectID: Project['_id']
    taskID: Task['_id']
}

export default function NoteCard({ note, projectID, taskID }: NoteCardProps) {

    const { data: user, isLoading: isUserLoading } = useAuth()

    //almacena el resultado de la funcion cuando alguna de las dependencias cambia
    const canDelete = useMemo(() => note.createdBy._id === user?._id, [user])

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['getTask', taskID] }) 
            toast.success(response.message);
        },
        onError: (response) => {
            toast.error(response.message)
        }
    })

    if(isUserLoading) return 'Cargando...'
    if(user) return (

        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    { formatDate(note.createdAt) }
                </p>
            </div>

            {
                canDelete && 
                    <button type="button" 
                    onClick={() => mutation.mutate({ projectID, taskID, noteID: note._id }) }
                        className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold 
                            cursor-pointer transition-colors">
                        Eliminar
                    </button>
            }
            

        </div>
    )
}
