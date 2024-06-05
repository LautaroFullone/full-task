import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, Task, TaskFormData, responseTaskSchema } from "@/types/index";

export async function createTask({ projectID, taskData }: { projectID: Project['_id'], taskData: TaskFormData }) {
    try {
        const { data } = await api.post(`projects/${projectID}/tasks`, taskData)
        return data;

    } catch (error) {
        console.log('# ERROR: createTask', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function getTaskById({ projectID, taskID }: { projectID: Project['_id'], taskID: Task['_id'] }) {
    try {
        const { data } = await api.get(`/projects/${projectID}/tasks/${taskID}`)
        const response = responseTaskSchema.safeParse(data);

        if (!response.success) throw new Error('Error parsing response');

        return response.data

    } catch (error) {
        console.log('# ERROR: getTaskById', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function updateTask({ projectID, taskID, newData }: { projectID: Project['_id'], taskID: Task['_id'], newData: TaskFormData }) {
    try {
        console.log('newData: ',newData)
        const { data } = await api.patch(`/projects/${projectID}/tasks/${taskID}`, newData)
        return data;

    } catch (error) {
        console.log('# ERROR: updateTask', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function deleteTask({ projectID, taskID }: { projectID: Project['_id'], taskID: Task['_id'] }) {
    try {
        const { data } = await api.delete(`/projects/${projectID}/tasks/${taskID}`)
        return data

    } catch (error) {
        console.log('# ERROR: deleteTask', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function updateTaskStatus({ projectID, taskID, status }: { projectID: Project['_id'], taskID: Task['_id'], status: Task['status'] }) {
    try {
        const { data } = await api.patch(`/projects/${projectID}/tasks/${taskID}`, { status })
        return data

    } catch (error) {
        console.log('# ERROR: deleteTask', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}
