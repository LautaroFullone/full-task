import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, User, responseTeamMemberSchema, responseTeamMembersListSchema } from "@/types/index";

export async function getProjectMemberByEmail({ projectID, email }: { projectID: Project['_id'], email: User['email'] }) {
    try {
        const { data } = await api.post(`/projects/${projectID}/team/find`, { email })
        const response = responseTeamMemberSchema.safeParse(data);

        if (!response.success) throw new Error('Error parsing response');

        return response.data

    } catch (error) {
        console.log('# ERROR: getProjectMemberByEmail', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function addProjectMember({ projectID, id }: { projectID: Project['_id'], id: User['_id'] }) {
    try {
        const { data } = await api.post(`/projects/${projectID}/team`, { id })
        return data

    } catch (error) {
        console.log('# ERROR: addProjectMember', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function getAllProjectMembers(projectID: Project['_id']) {
    try {
        const { data } = await api.get(`/projects/${projectID}/team`)
        const response = responseTeamMembersListSchema.safeParse(data);

        if (!response.success) throw new Error('Error parsing response');

        return response.data

    } catch (error) {
        console.log('# ERROR: getAllProjectMembers', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}

export async function deleteTeamMember({ projectID, userID }: { projectID: Project['_id'], userID: User['_id'] }) {
    try {
        const { data } = await api.delete(`/projects/${projectID}/team/${userID}`)
        return data

    } catch (error) {
        console.log('# ERROR: deleteTeamMember', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}