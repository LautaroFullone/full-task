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

export const responseEntitySchema = z.object({
    title: z.string(),
    message: z.string(),
    status: z.number(),
    records: z.union([  //record puede ser un la lista de Projects o un unico project
        z.array(
            projectSchema.pick({
                _id: true,
                projectName: true,
                clientName: true,
                description: true,
            })
        ),
        projectSchema.pick({
            _id: true,
            projectName: true,
            clientName: true,
            description: true,
        })
    ])
})

export type ResponseEntity = z.infer<typeof responseEntitySchema> 
