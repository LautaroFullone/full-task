import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { RegisterFormData } from "@/types/index";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerAccount } from "@/services/AuthApi";
import { toast } from "react-toastify";

export default function RegisterView() {

    const initialValues: RegisterFormData = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    }
    const navigate = useNavigate();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<RegisterFormData>({ defaultValues: initialValues });

    const mutation = useMutation({
        mutationFn: registerAccount,
        onSuccess: (response) => {
            toast.success(response.message);
            navigate('/');
        },
        onError: (response) => {
            toast.error(response.message)
        }
    })

    const password = watch('password');

    function handleRegister(formData: RegisterFormData) {
        mutation.mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold"> crear tu cuenta</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10 bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">Email</label>
                    <input
                        id="email"
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
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Nombre</label>
                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("name", {
                            required: "El Nombre de usuario es obligatorio",
                        })}
                    />

                    { errors.name && 
                        <ErrorMessage>{errors.name.message}</ErrorMessage> }

                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Constraseña</label>

                    <input
                        type="password"
                        placeholder="Constraseña de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "La constraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message: 'La constraseña debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />

                    { errors.password && 
                        <ErrorMessage>{errors.password.message}</ErrorMessage> }

                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Repetir Constraseña</label>

                    <input
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Repite Constraseña de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("passwordConfirmation", {
                            required: "Repetir la constraseña es obligatorio",
                            validate: value => value === password || 'Las contraseñas no coinciden'
                        })}
                    />

                    { errors.passwordConfirmation && 
                        <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage> }

                </div>

                <input
                    type="submit"
                    value='Registrarme'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to={'/auth/login'}
                    className='text-center text-gray-300 font-normal'>
                    Ya tenes cuenta? Iniciar Sesión
                </Link>
            </nav>
        </>
    )
}