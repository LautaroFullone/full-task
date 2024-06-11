import { IsNotEmpty } from "class-validator"

export class UpdateTaskDto {
    @IsNotEmpty()
    taskName: string

    @IsNotEmpty()
    description: string
}
