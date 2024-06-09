import { addProjectMember } from '@/services/TeamApi'
import { Project, TeamMember } from '@/types/index'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface SearchResultProps {
    user: TeamMember,
    projectID: Project['_id'],
    onFinish: () => void
}

export default function SearchResult({ user, projectID, onFinish }: SearchResultProps) {

    const mutation = useMutation({
        mutationFn: addProjectMember,
        onSuccess: (response) => {
            toast.success(response.message)
            onFinish();
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    
    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado: </p>
            <div className="flex justify-between items-center">
                <p>{user.name}</p>
                <button onClick={() => mutation.mutate({ projectID, id: user._id })}
                 className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer">
                    Agregar al Proyecto
                </button>
            </div>
        </>
    )
}
