import { IsEnum, IsNotEmpty } from "class-validator"

export class CreateTaskDto {
    
    @IsNotEmpty()
    taskName: string

    @IsNotEmpty()
    description: string

    //@IsEnum(taskStatus)  //para mostrar las opciones aceptadas al momento de lanzar error
    //status: TaskStatus;
}
