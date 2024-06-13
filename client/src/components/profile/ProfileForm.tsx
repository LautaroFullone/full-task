import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { User, UserProfileFormData } from "@/types/index"
import { useMutation } from "@tanstack/react-query"

interface ProfileForm {
    user: User
}

export default function ProfileForm({ user }: ProfileForm) {

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: user })

    // const mutation = useMutation({
    //     mutationFn: updateProject,
    //     onSuccess: (response) => {
    //         queryClient.invalidateQueries({ queryKey: ['getAllProjects'] }) //volver a ejecutar api call que estaba en cache
    //         queryClient.invalidateQueries({ queryKey: ['editProject', projectID] })
    //         toast.success(response.message);
    //         navigate('/');
    //     },
    //     onError: (response) => {
    //         toast.error(response.message);
    //     }
    // })

    function onSubmit(formData: UserProfileFormData) {
        // mutation.mutate({ id: projectID, newData: formData })
    }

    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Aquí puedes actualizar tu información</p>

                <form onSubmit={handleSubmit(onSubmit)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate>

                    <div className="mb-5 space-y-3">
                        <label className="text-sm uppercase font-bold" htmlFor="name">
                            Nombre
                        </label>

                        <input id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border border-gray-200"
                            {...register("name", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                        />

                        { errors.name &&
                            <ErrorMessage>{errors.name.message}</ErrorMessage> }

                    </div>

                    <div className="mb-5 space-y-3">
                        <label className="text-sm uppercase font-bold" htmlFor="password">
                            E-mail
                        </label>

                        <input id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3  border border-gray-200"
                            {...register("email", {
                                required: "EL e-mail es obligatorio",
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
                        value='Guardar Cambios'
                        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}