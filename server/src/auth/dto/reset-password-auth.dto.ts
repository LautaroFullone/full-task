import { IsNotEmpty, MaxLength, MinLength, Validate, ValidateIf } from "class-validator";
import { MatchPasswordConstraint } from "src/utils/validators/matchPasswordConstraint";

export class ResetPasswordAuthDto {

    @IsNotEmpty()
    @MinLength(4) @MaxLength(20)
    password: string;

    @IsNotEmpty() @ValidateIf(o => o.password)
    @Validate(MatchPasswordConstraint)
    passwordConfirmation: string;

}