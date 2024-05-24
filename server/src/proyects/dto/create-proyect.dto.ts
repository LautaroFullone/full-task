import { IsNotEmpty } from "class-validator";

export class CreateProyectDto {

    @IsNotEmpty()
    proyectName: string

    @IsNotEmpty()
    clientName: string

    @IsNotEmpty()
    description: string
}
