import { FormActionsType, TaskFormData } from "@/types/index"
import ErrorMessage from "../ErrorMessage"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { buttonTranslations } from "@/locales/es"

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
    handleSubmit: ReturnType<UseFormHandleSubmit<TaskFormData>>;
    action: FormActionsType
}

export default function TaskForm({ errors, register, handleSubmit, action }: TaskFormProps) {
    return (
        <>
            <form onSubmit={handleSubmit} className="mt-10 space-y-3" noValidate>
                
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >Nombre de la tarea</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nombre de la tarea"
                        className="w-full p-3  border-gray-300 border"
                        {...register("taskName", {
                            required: "El nombre de la tarea es obligatorio",
                        })}
                    />

                    { errors.taskName &&
                        <ErrorMessage>{errors.taskName.message}</ErrorMessage> }

                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="description"
                    >Descripción de la tarea</label>
                    <textarea
                        id="description"
                        placeholder="Descripción de la tarea"
                        className="w-full p-3  border-gray-300 border"
                        {...register("description", {
                            required: "La descripción de la tarea es obligatoria"
                        })}
                    />

                    { errors.description && 
                        <ErrorMessage>{errors.description.message}</ErrorMessage> }

                </div>

                <input type="submit"
                    value={`${buttonTranslations[action]} Tarea`}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white 
                                                uppercase font-bold cursor-pointer transition-colors" />
            </form>
        </>
    )
}