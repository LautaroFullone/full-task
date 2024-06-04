import { z } from "zod"

//---------------------<[ TASKS ]>---------------------
export const taskStatusShema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])

export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    description: z.string(),
    status: taskStatusShema,
    project: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'taskName' | 'description'>


//---------------------<[ PROJECTS ]>---------------------
export const projectSchema = z.object({ //para validar lo que envia la api
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskSchema)
})

export const projectsListSchema = z.array( 
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
)

//creamos un type TS a traves del schema
export type Project = z.infer<typeof projectSchema>
//creamos otro type pero sin el ID
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>


//---------------------<[ RESPONSE ENTITY ]>---------------------
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