import { useDroppable } from "@dnd-kit/core"

interface TaskDropProps {
    status: string
}

export default function TaskDrop({ status }: TaskDropProps) {

    const { isOver, setNodeRef } = useDroppable({ id: status })

    const style = {
        opacity: isOver ? 0.4 : undefined,
        cursor: 'grab'
    } 

    return (
        <div ref={setNodeRef} style={style}
            className="text-xs font-semibold uppercase p-2 border border-dashed 
            border-slate-500 mt-5 grid place-content-center text-slate-500">
            Soltar tarea aqui
        </div>
    )
}
