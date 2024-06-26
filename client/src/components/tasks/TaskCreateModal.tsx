import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import TaskForm from "./TaskForm";
import { Project, TaskFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/services/TaskApi";
import { toast } from "react-toastify";

interface TaskCreateModalProps{
    projectID: Project['_id']
}

export default function TaskCreateModal({ projectID }: TaskCreateModalProps) {

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const show = (queryParams.get('newTask')) ? true : false;
0
    const initialValues: TaskFormData = {
        taskName: '',
        description: ''
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: (response) => {
            toast.success(response.message);
            reset(); closeModal();
            queryClient.invalidateQueries({ queryKey: ['getProject', projectID] }) //volver a ejecutar api call que estaba en cache
        },
        onError: (response) => {
            toast.error(response.message)
        }
    })

    function onSubmit(formData: TaskFormData) {
        mutation.mutate({ projectID, taskData: formData })
    }

    function closeModal(){
        navigate('', { replace: true })
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}> {/* no puede volver a abrir el modal haciendo para atras la pestaña */}
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
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <TaskForm 
                                        handleSubmit={handleSubmit(onSubmit)}
                                        register={register}
                                        errors={errors}
                                        action="create" 
                                    />

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
