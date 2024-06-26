import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, ProjectFormData, responseProjectEditSchema, responseProjectSchema, responseProjectsListSchema } from "../types";

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

export async function getProjectByIdForEdit(id: Project['_id']) {
    try {
        const { data } = await api.get(`/projects/${id}`)
        const response = responseProjectEditSchema.safeParse(data);

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

export async function updateProject({ id, newData }: { id: Project['_id'], newData: ProjectFormData }) {
    try {
        const { data } = await api.patch(`/projects/${id}`, newData)    
        return data;
    
    } catch (error) {
        console.log('# ERROR: updateProject', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function deleteProject(id: Project['_id']) {
    try {
        const { data } = await api.delete(`/projects/${id}`)
        return data

    } catch (error) {
        console.log('# ERROR: deleteProject', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}
