import { z } from "zod"

export type FormActionsType = 'create' | 'edit';

//---------------------<[ AUTH ]>---------------------
export const authSchema = z.object({
    name: z.string(),
    email: z.string(),
    currentPassword: z.string(),
    password: z.string(),
    passwordConfirmation: z.string()
})

export type Auth = z.infer<typeof authSchema>

export type LoginFormData = Pick<Auth, 'email' | 'password'>
export type RegisterFormData = Pick<Auth, 'name' | 'email' | 'password' | 'passwordConfirmation'>
export type RequestRegisterCodeFormData = Pick<Auth, 'email'>
export type ForgotPasswordFormData = Pick<Auth, 'email'>
export type NewPasswordFormData = Pick<Auth, 'password' | 'passwordConfirmation'>
export type UserProfileFormData = Pick<Auth, 'name' | 'email'>
export type UpdateProfilePasswordFormData = Pick<Auth, 'currentPassword' | 'password' | 'passwordConfirmation' >

export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
})

export type User = z.infer<typeof userSchema>

//---------------------<[ TEAM ]>--------------------
export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string()
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

//---------------------<[ TASKS ]>---------------------
const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    description: z.string(),
    status: taskStatusSchema,
    project: z.string(),
    completedBy: z.array(
        z.object({
            _id: z.string(),
            user: userSchema,
            status: taskStatusSchema
        })
    ),
    notes: z.array(
        noteSchema.extend({
            createdBy: userSchema
        })
    ),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'taskName' | 'description'>

//---------------------<[ PROJECTS ]>---------------------
export const projectSchema = z.object({ //para validar lo que envia la api
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskSchema),
    manager: z.string()
})

export const projectOfListSchema = projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true
})

//creamos un type TS a traves del schema
export type Project = z.infer<typeof projectSchema>
export type ProjectOfListSchema = z.infer<typeof projectOfListSchema>
//creamos otro type pero sin el ID
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

//---------------------<[ TEAM ]>--------------------
export const teamMemberSchema = userSchema.pick({
    _id: true,
    name: true,
    email: true,
})

export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberFormData = Pick<TeamMember, 'email'>

//---------------------<[ RESPONSE ENTITY ]>---------------------
const responseEntitySchema = z.object({
    title: z.string(),
    message: z.string(),
    status: z.number(),
})

export const responseProjectSchema = responseEntitySchema.extend({
    records: projectSchema
});

export const responseProjectsListSchema = responseEntitySchema.extend({
    records: z.array(projectOfListSchema)
});

export const responseTaskSchema = responseEntitySchema.extend({
   records: taskSchema 
})

export const responseTasksListSchema = responseEntitySchema.merge(
    z.object({ records: z.array(taskSchema) })
)

export const responseTeamMemberSchema = responseEntitySchema.merge(
    z.object({ records: teamMemberSchema })
)

export const responseTeamMembersListSchema = responseEntitySchema.merge(
    z.object({ records: z.array(teamMemberSchema) })
)