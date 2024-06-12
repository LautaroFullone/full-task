import { NoteFormData, Project, Task } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/services/NoteApi";
import { toast } from "react-toastify";

interface NoteFormProps {
    taskID: Task['_id']
    projectID: Project['_id']
}

export default function NoteForm({ taskID, projectID }: NoteFormProps) {

    const initialValues: NoteFormData = {
        content: ''
    }
    // const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    // const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: (response) => {
            reset();
            // queryClient.invalidateQueries({ queryKey: ['getAllProjects'] }) //volver a ejecutar api call que estaba en cache
            // queryClient.invalidateQueries({ queryKey: ['editProject', projectID] })
            toast.success(response.message);
            //navigate('/');
        },
        onError: (response) => {
            toast.error(response.message);
        }
    })

    function onSubmit(formData: NoteFormData){
        mutation.mutate({ projectID, taskID, noteData: formData })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>

            <div className="flex flex-col gap-2">
                <label htmlFor="content" className="font-bold">Crear Nota</label>
                <input type="text" 
                    id="content" 
                    className="w-full p-3 border border-gray-300" 
                    placeholder="Contenido de la nota"
                    {...register("content", {
                        required: "El Contenido de la nota es obligatorio",
                    })}
                />

                { errors.content &&
                    <ErrorMessage>{errors.content.message}</ErrorMessage> }

            </div>

            <input type="submit" value="Crear Nota" 
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 
                    text-white font-black cursor-pointer" />
        </form>
    )
}
