import ErrorMessage from '@/components/ErrorMessage'
import { loginAccount } from '@/services/AuthApi'
import { LoginFormData } from '@/types/index'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function LoginView() {
    
    const initialValues: LoginFormData = {
        email: '',
        password: '',
    }

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: loginAccount,
        onSuccess: (response) => {
            toast.success(response.message)
            navigate('/')
        },
        onError: (response) => {
            toast.error(response.message)
        }
    })

    function onSubmit(formData: LoginFormData){
        mutation.mutate(formData)
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
            <p className="text-2xl font-light text-white mt-5">
                Llena el formulario para {''}
                <span className=" text-fuchsia-500 font-bold"> acceder</span>
            </p>

            <form onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 p-10 bg-white mt-10 rounded-lg"
                noValidate>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
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

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Constraseña</label>

                    <input
                        type="password"
                        placeholder="Constraseña de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "La constraseña es obligatorio",
                        })}
                    />
                    
                    { errors.password && 
                        <ErrorMessage>{errors.password.message}</ErrorMessage> }

                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to={'/auth/register'}
                    className='text-center text-gray-300 font-normal'>
                    ¿No tenes cuenta? Crea una
                </Link>
                
                <Link to={'/auth/forgot-password'}
                    className='text-center text-gray-300 font-normal'>
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </>
    )
}
