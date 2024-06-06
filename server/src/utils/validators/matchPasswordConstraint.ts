import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

@ValidatorConstraint({ name: 'matchPassword', async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
    
    validate(passwordConfirmation: string, args: ValidationArguments) {
        const registerDtoData = args.object as RegisterAuthDto;
        
        return passwordConfirmation === registerDtoData['password'];
    }

    defaultMessage(args: ValidationArguments) {
        return 'Las contraseñas no coinciden'
    }
}