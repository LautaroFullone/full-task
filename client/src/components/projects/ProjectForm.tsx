import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { FormActionsType, ProjectFormData } from "types";

const buttonTranslations: { [key: string]: string } = {
    create: 'Crear Proyecto',
    edit: 'Editar Proyecto',
}
interface ProjectFormProps {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
    handleSubmit: ReturnType<UseFormHandleSubmit<ProjectFormData>>;
    action: FormActionsType
}

export default function ProjectForm({ register, errors, handleSubmit, action }: ProjectFormProps) {
    return (
        <>
            <form onSubmit={handleSubmit} className="mt-10 shadow-lg p-10 rounded-lg" noValidate>
                
                <div className="mb-5 space-y-3">
                    <label htmlFor="projectName" className="text-sm uppercase font-bold">
                        Nombre del Proyecto
                    </label>
                    <input
                        id="projectName"
                        className="w-full p-3 border border-gray-200"
                        type="text"
                        placeholder="Nombre del Proyecto"
                        {...register("projectName", {
                            required: "El Titulo del Proyecto es obligatorio",
                        })}
                    />

                    { errors.projectName && 
                        <ErrorMessage>{errors.projectName.message}</ErrorMessage> }

                </div>

                <div className="mb-5 space-y-3">
                    <label htmlFor="clientName" className="text-sm uppercase font-bold">
                        Nombre Cliente
                    </label>
                    <input
                        id="clientName"
                        className="w-full p-3  border border-gray-200"
                        type="text"
                        placeholder="Nombre del Cliente"
                        {...register("clientName", {
                            required: "El Nombre del Cliente es obligatorio",
                        })}
                    />

                    { errors.clientName && 
                        <ErrorMessage>{errors.clientName.message}</ErrorMessage> }

                </div>

                <div className="mb-5 space-y-3">
                    <label htmlFor="description" className="text-sm uppercase font-bold">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        className="w-full p-3 border border-gray-200"
                        placeholder="Descripción del Proyecto"
                        {...register("description", {
                            required: "Una descripción del proyecto es obligatoria"
                        })}
                    />

                    { errors.description && 
                        <ErrorMessage>{errors.description.message}</ErrorMessage> }

                </div>

                <input type="submit"
                    value={buttonTranslations[action]}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white 
                                uppercase font-bold cursor-pointer transition-colors" />

            </form>
        </>
    )
}