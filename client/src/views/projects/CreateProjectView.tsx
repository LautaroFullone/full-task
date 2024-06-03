import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createProject } from "@/services/ProjectApi";
import { ProjectFormData } from "@/types/index";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {

    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    
    const mutation = useMutation({
        mutationFn: createProject,
        onSuccess: (response) => {
            toast.success(response.message);
            navigate('/');
        },
        onError: (response) => { 
            toast.error(response.message)
        }
    })

    function onSubmit(data: ProjectFormData){ 
        mutation.mutate(data) 
    }   

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Proyectos</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

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
                        value="Crear Proyecto"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white 
                                uppercase font-bold cursor-pointer transition-colors" />

                </form>
            </div>
        </>
    )
}
