import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/services/ProjectApi";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { toast } from "react-toastify";

interface ProjectEditorProps {
    project: ProjectFormData,
    projectID: Project['_id']
}

export default function ProjectEditor({ project, projectID }: ProjectEditorProps) {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: project })

    const queryClient = useQueryClient()
    
    const mutation = useMutation({
        mutationFn: updateProject,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['getAllProjects'] }) //volver a ejecutar api call que estaba en cache
            queryClient.invalidateQueries({ queryKey: ['editProject', projectID] })
            toast.success(response.message);
            navigate('/');
        },
        onError: (response) => {
            toast.error(response.message);
        }
    })

    function onSubmit(formData: ProjectFormData) {
        mutation.mutate({ id: projectID, newData: formData })
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyecto</p>

                <nav className="my-5">
                    <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl 
                        font-bold cursor-pointer transition-colors" to={'/'}>
                        Volver a Proyectos
                    </Link>
                </nav>

                <ProjectForm
                    handleSubmit={handleSubmit(onSubmit)}
                    register={register}
                    errors={errors}
                    action="edit"
                />

            </div>
        </>
    )
}
