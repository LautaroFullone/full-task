import ErrorMessage from "@/components/ErrorMessage";
import { updateProfilePassword } from "@/services/AuthApi";
import { UpdateProfilePasswordFormData } from "@/types/index"
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ChangePasswordView() {

    const initialValues: UpdateProfilePasswordFormData = {
        currentPassword: '',
        password: '',
        passwordConfirmation: ''
    }

    const { register, handleSubmit, formState: { errors }, watch, reset } 
        = useForm<UpdateProfilePasswordFormData>({ defaultValues: initialValues });

    const mutation = useMutation({
        mutationFn: updateProfilePassword,
        onSuccess: (response) => {
            toast.success(response.message);
            reset();
        },
        onError: (response) => {
            toast.error(response.message)
        }
    })

    const password = watch('password');

    function onSubmit(formData: UpdateProfilePasswordFormData) { console.log('onSubmt'); mutation.mutate(formData) }

    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-black ">Cambiar Contraseña</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Utiliza este formulario para cambiar tu contraseña
                </p>

                <form onSubmit={handleSubmit(onSubmit)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate>

                    <div className="mb-5 space-y-3">
                        <label className="text-sm uppercase font-bold" htmlFor="currentPassword">
                            Contraseña Actual
                        </label>

                        <input id="currentPassword"
                            type="password"
                            placeholder="Contraseña actual"
                            className="w-full p-3  border border-gray-200"
                            {...register("currentPassword", {
                                required: "La contraseña actual es obligatoria",
                            })}
                        />

                        { errors.currentPassword &&
                            <ErrorMessage>{errors.currentPassword.message}</ErrorMessage> }

                    </div>

                    <div className="mb-5 space-y-3">
                        <label className="text-sm uppercase font-bold" htmlFor="password">
                            Nueva Contraseña
                        </label>

                        <input id="password"
                            type="password"
                            placeholder="Contraseña actual"
                            className="w-full p-3  border border-gray-200"
                            {...register("password", {
                                required: "La nueva contraseña es obligatoria",
                                minLength: {
                                    value: 8,
                                    message: 'La constraseña debe ser mínimo de 8 caracteres'
                                }
                            })}
                        />

                        { errors.password &&
                            <ErrorMessage>{errors.password.message}</ErrorMessage> }

                    </div>

                    <div className="mb-5 space-y-3">
                        <label className="text-sm uppercase font-bold" htmlFor="passwordConfirmation">
                            Repetir Contraseña
                        </label>

                        <input
                            id="passwordConfirmation"
                            type="password"
                            placeholder="Repite Constraseña"
                            className="w-full p-3  border-gray-300 border"
                            {...register("passwordConfirmation", {
                                required: "Repetir la constraseña es obligatorio",
                                validate: value => value === password || 'Las contraseñas no coinciden'
                            })}
                        />

                        { errors.passwordConfirmation &&
                            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage> }

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
