import { z } from "zod"

export const projectSchema = z.object({ //para validar data en tiempo de ejecucion
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
})

//creamos un type TS a traves del zod schema
export type Project = z.infer<typeof projectSchema> 
//creamos otro type pero sin el ID
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>