import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, ProjectFormData, responseEntitySchema } from "../types";

export async function createProject(projectData: ProjectFormData){
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

export async function getAllProjects() {
    try {
        const { data } = await api.get(`/projects`)
        const response = responseEntitySchema.safeParse(data)
        
        console.log('# getAllProjects', data)
        console.log('# success', response.success)

        if(response.success) return response.data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error('getAllProjects', error)
            throw new Error(error.response.data.message)
        }
    }
}

export async function getProjectById(id: Project['_id']) {
    try {
        const { data } = await api.get(`/projects/${id}`)
        const response = responseEntitySchema.safeParse(data)
        
        console.log('# getProjectById', data)
        console.log('# success', response.success)

        if (response.success) return response.data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.log('# ERROR: getAllProjects', error)
            throw new Error(error.response.data.message)
        }
    }
}