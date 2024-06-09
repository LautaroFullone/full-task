import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, User, responseTeamMemberSchema } from "@/types/index";

export async function getProjectMemberByEmail({ projectID, email }: { projectID: Project['_id'], email: User['email'] }) {
    try {
        const { data } = await api.post(`/projects/${projectID}/team/find`, { email })
        const response = responseTeamMemberSchema.safeParse(data);

        console.log('getProjectMemberByEmail', data)
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