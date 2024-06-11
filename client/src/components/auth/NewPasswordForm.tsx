import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { NewPasswordFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { resetPassword } from "@/services/AuthApi";

interface NewPasswordFormProps {
    code: string;
}

export default function NewPasswordForm({ code }: NewPasswordFormProps) {

    const navigate = useNavigate()

    const initialValues: NewPasswordFormData = {
        password: '',
        passwordConfirmation: '',
    }
    
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const mutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: (response) => {
            toast.success(response.message);
            reset();
            navigate(location.pathname+'/auth/login')
        },
        onError: (response) => {
            toast.error(response.message)
        }
    })


    function onSubmit(formData: NewPasswordFormData) { mutation.mutate({ formData, registerCode: code})}

    const password = watch('password');

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 p-10  bg-white mt-10 rounded-lg"
                noValidate>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Contraseña</label>

                    <input type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message: 'La contraseña debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />

                    { errors.password && 
                        <ErrorMessage>{errors.password.message}</ErrorMessage> }

                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Repetir Contraseña</label>

                    <input id="passwordConfirmation"
                        type="password"
                        placeholder="Repite Contraseña de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("passwordConfirmation", {
                            required: "Repetir Contraseña es obligatorio",
                            validate: value => value === password || 'Las contraseñas no son iguales'
                        })}
                    />

                    { errors.passwordConfirmation && 
                        <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage> }
                </div>

                <input type="submit"
                    value='Establecer Contraseña'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />

            </form>
        </>
    )
}
