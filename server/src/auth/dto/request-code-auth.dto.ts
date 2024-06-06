import { IsEmail } from "class-validator";

export class RequestCodeAuthDto {

    @IsEmail()
    email: string

}