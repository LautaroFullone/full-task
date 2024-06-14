import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { Project, TeamMemberFormData } from "@/types/index";
import { getProjectMemberByEmail } from "@/services/TeamApi";
import SearchResult from "./SearchResult";

interface AddMemberFormProps {
    projectID: Project['_id']
}

export default function AddMemberForm({ projectID }: AddMemberFormProps) {

    const initialValues: TeamMemberFormData = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })
    
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: getProjectMemberByEmail
    })

    function onSubmit(formData: TeamMemberFormData) { 
        mutation.mutate({ projectID, email: formData.email})
        queryClient.invalidateQueries({ queryKey: ['getProjectMembers'] }) 
    }

    function resetData(){
        reset();
        mutation.reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                className="mt-10 space-y-5"
                noValidate >

                <div className="flex flex-col gap-3">
                    <label className="font-normal text-2xl" htmlFor="name">E-mail de Usuario</label>
                    
                    <input id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />

                    { errors.email && 
                        <ErrorMessage>{errors.email.message}</ErrorMessage> }

                </div>

                <input type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>

            <div className="mt-10">
                { mutation.isPending && <p className="text-center"> Cargando...</p>}
                { mutation.isError && <p className="text-center">{ mutation.error.message }</p>}
                { mutation.data && <SearchResult user={mutation.data.records} projectID={projectID} onFinish={resetData}/>}

            </div>

        </>
    )
}