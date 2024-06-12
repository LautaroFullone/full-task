import { Project, Task } from '@/types/index'
import NoteForm from './NoteForm'

interface NotesPanelProps {
    taskID: Task['_id']
    projectID: Project['_id']
}

export default function NotesPanel({ taskID, projectID }: NotesPanelProps) {
    return (
        <>
            <NoteForm taskID={taskID} projectID={projectID}/>
        </>
    )
}
