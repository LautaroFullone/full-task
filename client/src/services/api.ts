import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { ProjectFormData } from "types";

export async function createProject(projectData: ProjectFormData){
    console.log('createProject: ', projectData)

    try {
        const { data } = await api.post(`/projects`, projectData)
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.error('createProject',error)
            throw new Error(error.response.data.message)
        }

    }
}