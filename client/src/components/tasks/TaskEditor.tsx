import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Project, Task, TaskFormData } from '@/types/index';
import { toast } from 'react-toastify';
import { updateTask } from '@/services/TaskApi';

interface ProjectEditorProps {
    task: TaskFormData,
    taskID: Task['_id'],
    projectID: Project['_id']
}

export default function TaskEditor({ task, taskID, projectID }: ProjectEditorProps) {

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: task })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: updateTask,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['editTask', taskID] }) //volver a ejecutar api call que estaba en cache
            queryClient.invalidateQueries({ queryKey: ['getProject', projectID] }) //volver a ejecutar api call que estaba en cache
            toast.success(response.message);
            closeModal()
        },
        onError: (response) => {
            toast.error(response.message);
        },
        retry: false
    })

    function onSubmit(formData: TaskFormData) {
        mutation.mutate({ projectID, taskID, newData: formData })
    }

    function closeModal() { //elimina el query param
        navigate(location.pathname, { replace: true })
    }

    return (
        <Transition appear show={true} as={Fragment}>
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
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <TaskForm
                                    handleSubmit={handleSubmit(onSubmit)}
                                    register={register}
                                    errors={errors}
                                    action="edit"
                                />

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}