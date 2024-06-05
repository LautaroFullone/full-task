import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Validate, ValidateIf } from "class-validator";
import { MatchPasswordConstraint } from "src/utils/validators/matchPasswordConstraint";

export class RegisterAuthDto{
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(4) @MaxLength(20)
    name: string;
    
    @IsNotEmpty()
    @MinLength(4) @MaxLength(20)
    password: string;

    @IsNotEmpty() @ValidateIf(o => o.password)
    @Validate(MatchPasswordConstraint)
    passwordConfirmation: string;

}