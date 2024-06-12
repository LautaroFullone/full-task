import { api } from "@/lib/axios";
import { Note, NoteFormData, Project, Task } from "../types";
import { isAxiosError } from "axios";

interface NoteApiIParams {
    projectID: Project['_id'];
    taskID: Task['_id'];
    noteData: NoteFormData
    noteID: Note['_id']
}

export async function createNote({ projectID, taskID, noteData }: Pick<NoteApiIParams, 'projectID' | 'taskID' | 'noteData'>) {
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

export async function deleteNote({ projectID, taskID, noteID }: Pick<NoteApiIParams, 'projectID' | 'taskID' | 'noteID'>) {
    try {
        const { data } = await api.delete(`projects/${projectID}/tasks/${taskID}/notes/${noteID}`)
        return data

    } catch (error) {
        console.log('# ERROR: deleteNote', error)
        if (isAxiosError(error) && error.response)
            throw new Error(error.response.data.message)
        else if (error instanceof Error)
            throw new Error(error.message);
        else
            throw new Error('An unknown error has ocurred')
    }
}