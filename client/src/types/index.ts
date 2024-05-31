import { z } from "zod"

//---------------------<[ PROJECTS ]>---------------------
export const projectSchema = z.object({ //para validar data en tiempo de ejecucion
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
})

export const projectsListSchema = z.array( //para validar data en tiempo de ejecucion
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)

//creamos un type TS a traves del zod schema
export type Project = z.infer<typeof projectSchema>
//creamos otro type pero sin el ID
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

//---------------------<[ API ]>---------------------

const responseEntitySchema = z.object({
    title: z.string(),
    message: z.string(),
    status: z.number(),
})

export const responseProjectSchema = responseEntitySchema.merge(
    z.object({ records: projectSchema })
)

export const responseProjectsListSchema = responseEntitySchema.merge(
    z.object({ records: z.array(projectSchema) })
)