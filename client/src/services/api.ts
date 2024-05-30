import { api } from "@/lib/axios";
import { ProjectFormData } from "types";

export async function createProject(projectData: ProjectFormData){
    console.log('createProject: ', projectData)

    try {
        const { data } = await api.post(`/projects`, projectData)
        return data;
    } catch (error) {
        console.error(error)
    }
}