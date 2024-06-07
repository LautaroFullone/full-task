import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordFormData } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/AuthApi";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    
    const initialValues: ForgotPasswordFormData = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const mutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (response) => {
            toast.success(response.message);
            reset();
        },
        onError: (response) => {
            toast.error(response.message)
        }
    })

    const onSubmit = (formData: ForgotPasswordFormData) => mutation.mutate(formData)


    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                Olvidaste tu contraseña? Coloca tu e-mail {''}
                <span className=" text-fuchsia-500 font-bold"> y reestablecela</span>
            </p>

            <form onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 p-10 bg-white mt-10 rounded-lg"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">Email</label>
                    <input id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />

                    { errors.email &&
                        <ErrorMessage>{errors.email.message}</ErrorMessage> }
                </div>

                <input
                    type="submit"
                    value='Enviar Instrucciones'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to='/auth/login' 
                    className="text-center text-gray-300 font-normal">
                    ¿Ya tenes cuenta? Iniciar Sesión
                </Link>

                <Link to='/auth/register'
                    className="text-center text-gray-300 font-normal">
                    ¿No tenes cuenta? Crea una
                </Link>
            </nav>
        </>
    )
}