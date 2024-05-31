import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updateProject } from "@/services/api";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { toast } from "react-toastify";

interface EditProjectFormProps {
    project: ProjectFormData,
    projectID: Project['_id']
}

export default function EditProjectForm({ project, projectID }: EditProjectFormProps) {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: project })

    const mutation = useMutation({
        mutationFn: updateProject,
        onSuccess: (response) => {
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

                <form onSubmit={handleSubmit(onSubmit)}
                    className="mt-10 shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input type="submit"
                        value="Guardar Cambios"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white 
                                uppercase font-bold cursor-pointer transition-colors" />

                </form>
            </div>
        </>
    )
}
