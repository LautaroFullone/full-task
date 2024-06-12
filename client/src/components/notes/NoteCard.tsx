import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"

interface NoteCardProps {
    note: Note
}
export default function NoteCard({ note }: NoteCardProps) {
    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    { formatDate(note.createdAt) }
                </p>
            </div>

        </div>
    )
}
