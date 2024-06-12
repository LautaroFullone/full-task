import { Project, Task } from '@/types/index'
import NoteForm from './NoteForm'
import NoteCard from './NoteCard'

interface NotesPanelProps {
    taskID: Task['_id']
    projectID: Project['_id']
    notes: Task['notes']
}

export default function NotesPanel({ notes, taskID, projectID }: NotesPanelProps) {
    return (
        <>
            <NoteForm taskID={taskID} projectID={projectID}/>

            <div className="devide-y divide-gray-100 mt-10">

                {
                    notes.length === 0
                        ?   <p className="text-gray-500 text-center pt-3">No hay notas</p>
                        :   <>
                                <p className="font-bold text-2xl text-slate-600 my-5">Notas: </p>
                                { notes.map(note => <NoteCard key={note._id} note={note} />) }
                            </>
                }

            </div>
        </>
    )
}
