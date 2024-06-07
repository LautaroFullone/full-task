import NewPasswordCode from "@/components/auth/NewPasswordCode"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { useState } from "react"

export default function ResetPasswordView() {

    const [code, setCode] = useState<string>('')
    const [isValidCode, setIsValidCode] = useState(false)

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el codigo que recibiste en tu {''}
                <span className=" text-fuchsia-500 font-bold"> un nuevo email</span>
            </p>

            { !isValidCode
                ? <NewPasswordCode code={code} setCode={setCode} setIsValidCode={setIsValidCode} />
                : <NewPasswordForm code={code} /> }
        </>
    )
}
