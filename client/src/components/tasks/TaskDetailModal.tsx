import { statusTranslations } from "@/locales/es";
import { getTaskById, updateTaskStatus } from "@/services/TaskApi";
import { Project, TaskStatus } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";

interface TaskDetailModalProps {
    projectID: Project['_id']
}

export default function TaskDetailModal({ projectID }: TaskDetailModalProps) {

    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const viewTaskID = queryParams.get('viewTask')!

    const { data, isError, error } = useQuery({
        queryKey: ['getTask', viewTaskID],
        queryFn: () => getTaskById({ projectID, taskID: viewTaskID }),
        enabled: !!viewTaskID,   //es lo mismo que -> viewTaskID ? true : false
        retry: false
    })

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateTaskStatus,
        onSuccess: (response) => {
            toast.success(response.message);
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['getProject', projectID] }) 
            queryClient.invalidateQueries({ queryKey: ['getTask', viewTaskID] }) 
        },
        onError: (response) => {
            toast.error(response.message)
        }
    })

    function handleStatusChange(evt: ChangeEvent<HTMLSelectElement>){
        const status = evt.target.value as TaskStatus;

        mutation.mutate({ projectID, taskID: viewTaskID, status  })
    }

    function closeModal() {
        navigate('', { replace: true })
    }

    if (isError) {
        toast.error(error.message)
        return <Navigate to={`projects/${projectID}`} />
    }

    if (data) {
        const task = data.records;
        return (
            <>
                <Transition appear show={!!viewTaskID} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/60" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                        <p className='text-sm text-slate-400'>Agregada el: { formatDate(task.createdAt) }</p>
                                        <p className='text-sm text-slate-400'>Última actualización: { formatDate(task.updatedAt) }</p>
                                        <Dialog.Title
                                            as="h3"
                                            className="font-black text-4xl text-slate-600 my-5"
                                        >{task.taskName}
                                        </Dialog.Title>
                                        <p className='text-lg text-slate-500 mb-2'>Descripción: {task.description}</p>
                                        <div className='my-5 space-y-3'>
                                            <label className='font-bold'>Estado Actual:</label>
                                            
                                            <select defaultValue={task.status} className="w-full p-3 border border-gray-300" onChange={handleStatusChange}>
                                                { Object.entries(statusTranslations).map( ([key, value]) => 
                                                        <option key={key} value={key}>{value}</option>) }
                                            </select>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        )
    }

}
