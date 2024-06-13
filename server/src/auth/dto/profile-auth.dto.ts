import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class ProfileAuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(4) @MaxLength(20)
    name: string;
}