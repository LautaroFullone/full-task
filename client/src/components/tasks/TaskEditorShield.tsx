import { getTaskById } from '@/services/TaskApi';
import { Project } from '@/types/index';
import { useQuery } from '@tanstack/react-query';
import { Navigate, useSearchParams } from 'react-router-dom';
import TaskEditor from './TaskEditor';

interface TaskEditorShieldProps {
    projectID: Project['_id']
}

export default function TaskEditorShield({ projectID }: TaskEditorShieldProps) {
    
    const [searchParams, _] = useSearchParams();
    const editTaskID = searchParams.get('editTask')
    
    //gracias a la prop enabled, solo realiza la consulta cuando editTaslID tiene valor
    const { data, isError } = useQuery({
        queryKey: ['editTask', editTaskID], 
        queryFn: () => getTaskById({ projectID, taskID: editTaskID!}),
        enabled: !!editTaskID,   //es lo mismo que -> editTaskID ? true : false
    })
        
    if(isError) return <Navigate to={'error'} />
    if(data){
        //solo envio taskname y description (workarround para no sobrescribir el project id como string)
        const { _id, project, status, createdAt, updatedAt, ...taskData } = data.records; 

        return <TaskEditor task={taskData} taskID={editTaskID!} projectID={projectID!} />
    } 
        
}
