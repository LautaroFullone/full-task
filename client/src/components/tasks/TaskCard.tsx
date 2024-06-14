import { deleteTask } from "@/services/TaskApi"
import { Project, Task } from "@/types/index"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Fragment } from "react"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useDraggable } from "@dnd-kit/core"

interface TaskCardTProps {
    task: Task,
    canUserEdit: boolean;
    projectID: Project['_id']
}

export default function TaskCard({ task, projectID, canUserEdit }: TaskCardTProps) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task._id })
    const [_, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['getProject', projectID] })
            toast.success(response.message);
        },
        onError: (response) => {
            toast.error(response.message)
        }
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        cursor: 'grabbing'
    } : undefined

    return (
        <li className="p-5 bg-white border border-slate-300 flex justify-between gap-3">

            <div className="min-w-0 flex flex-col gap-y-4" style={style}
                {...listeners} {...attributes} ref={setNodeRef}>
                
                <p className="text-xl font-bold text-slate-600 text-left">
                    {task.taskName}
                </p>

                <p className="text-slate-500">{task.description}</p>
            </div>

            <div className="flex shrink-0  gap-x-6">
                <Menu as="div" className="relative flex-none">
                    
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </MenuButton>

                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        
                        <MenuItems
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <MenuItem>
                                <button type='button' 
                                    onClick={() => setSearchParams({ viewTask: task._id })}  
                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                    Ver Tarea
                                </button>
                            </MenuItem>

                            {
                                canUserEdit &&
                                    <>
                                        <MenuItem>
                                            <button type='button' onClick={() => setSearchParams({ editTask: task._id })} className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                Editar Tarea
                                            </button>
                                        </MenuItem>

                                        <MenuItem>
                                            <button type='button' onClick={() => mutate({ projectID, taskID: task._id })} className='block px-3 py-1 text-sm leading-6 text-red-500'>
                                                Eliminar Tarea
                                            </button>
                                        </MenuItem>
                                    </>
                            }
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
        </li>
    )
}
