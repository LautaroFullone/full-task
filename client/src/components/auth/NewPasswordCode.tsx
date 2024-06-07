import { validateCode } from "@/services/AuthApi";
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

interface NewPasswordCodeProps {
    code: string;
    setCode: Dispatch<SetStateAction<string>>
    setIsValidCode: Dispatch<SetStateAction<boolean>>
}

export default function NewPasswordCode({ code, setCode, setIsValidCode }: NewPasswordCodeProps) {

    const mutation = useMutation({
        mutationFn: validateCode,
        onSuccess: (response) => {
            toast.success(response.message);
            setIsValidCode(true)
        },
        onError: (response) => {
            toast.error(response.message)
        }
    })


    function handleChange(code: string) { setCode(code) }

    function handleComplete(code: string) { mutation.mutate(code) }

    return (
        <>
            <form className="space-y-8 p-10 rounded-lg bg-white mt-10" >
                <label className="font-normal text-2xl text-center block">Código de 6 dígitos</label>

                <div className="flex justify-center gap-5">
                    <PinInput value={code} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal">
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}
