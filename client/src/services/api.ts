import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, ProjectFormData, responseProjectSchema, responseProjectsListSchema } from "../types";

export async function createProject(projectData: ProjectFormData){
    try {
        const { data } = await api.post(`/projects`, projectData)
        return data;
        
    } catch (error) {
        console.log('# ERROR: createProject', error)
        if(isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function getAllProjects() {
    try {
        const { data } = await api.get(`/projects`)
        const response = responseProjectsListSchema.safeParse(data)

        if (!response.success) throw new Error('Error parsing response');
   
        return response.data

    } catch (error) {
        console.log('# ERROR: getAllProjects', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if(error instanceof Error)
            throw new Error(error.message);
        else 
            throw new Error('An unknown error has ocurred')
    }
}

export async function getProjectById(id: Project['_id']) {
    try {
        const { data } = await api.get(`/projects/${id}`)
        const response = responseProjectSchema.safeParse(data);

        if (!response.success) throw new Error('Error parsing response');

        return response.data

    } catch (error) {
        console.log('# ERROR: getProjectById', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}