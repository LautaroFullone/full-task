import { api } from "@/lib/axios";
import { NoteFormData, Project, Task } from "../types";
import { isAxiosError } from "axios";

interface NoteApiInterface {
    projectID: Project['_id'];
    taskID: Task['_id'];
    noteData: NoteFormData
}

export async function createNote({ projectID, taskID, noteData }: NoteApiInterface) {
    try {
        const { data } = await api.post(`projects/${projectID}/tasks/${taskID}/notes/`, noteData)
        return data;

    } catch (error) {
        console.log('# ERROR: createNote', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}