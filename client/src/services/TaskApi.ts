import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, TaskFormData } from "@/types/index";

export async function createTask({ projectID, taskData }: { projectID: Project['_id']; taskData: TaskFormData }) {
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
