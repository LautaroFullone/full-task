import { IsNotEmpty } from "class-validator";

export class RegistrationTokenDto {

    @IsNotEmpty()
    token: string

}