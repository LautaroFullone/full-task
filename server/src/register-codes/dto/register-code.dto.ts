import { IsNotEmpty } from "class-validator";

export class RegisterCodeDto {

    @IsNotEmpty()
    code: string

}