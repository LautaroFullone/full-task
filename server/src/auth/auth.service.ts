import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { User, UserDocument } from 'src/users/model/user.schema';
import { ResponseEntity } from 'src/utils/responses';
import { JwtService } from '@nestjs/jwt';
import { compareHash, generateHash } from 'src/utils/scripts/hashHandling';
import { generateRegisterToken } from 'src/utils/scripts/tokenCreation';
import { RegisterToken } from 'src/register-tokens/model/register-token.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

type Token = {
    token: string
}

@Injectable()
export class AuthService {
    
    constructor(private readonly jwtService: JwtService, 
                private readonly eventEmitter: EventEmitter2,
                @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
                @InjectModel(RegisterToken.name) private readonly registerTokenModel: Model<RegisterToken>) { }
    
    async handleRegister(registerData: RegisterAuthDto): Promise<ResponseEntity<User>> { 
       
        const userExist = await this.userModel.findOne({ email: registerData.email });
        if (userExist) throw new ConflictException('Ya existe un usuario registrado con ese email');
        
        const cryptPass = await generateHash(registerData.password) 
        
        const newUser = await this.userModel.create({ ...registerData, password: cryptPass })
        
        const registrationToken = await this.registerTokenModel.create({ token: generateRegisterToken(), user: newUser })

        this.eventEmitter.emit('user.register', { user: newUser, token: registrationToken.token})

        return new ResponseEntity<User>()
            .setRecords(newUser)
            .setTitle('handleRegister')
            .setMessage('Usuario registrado correctamente, revise su correo!')
            .setStatus(201)
            .build();
    }

    async handleLogin(loginData: LoginAuthDto): Promise<ResponseEntity<Token>> {
        
        const userExist = await this.userModel.findOne({ email: loginData.email });
        if (!userExist) throw new NotFoundException('El usuario no existe');

        const check = await compareHash(loginData.password, userExist.password)
        if (!check) throw new ForbiddenException('Contraseña incorrecta');

        //esto es lo que mando a codificar al token, info a la que accedo dsp en jwt.strategy !!
        const payload = {
            id: userExist._id,
        }

        const token = this.jwtService.sign(payload)

        return new ResponseEntity<Token>()
            .setRecords({ token })
            .setTitle('handleRegister')
            .setMessage('Sesion iniciada correctamente')
            .setStatus(201)
            .build();
    }

    async confirmAccount(registrationToken: string): Promise<ResponseEntity<User>> {
        
        const tokenExist = await this.registerTokenModel.findOne({ token: registrationToken });
        if (!tokenExist) throw new NotFoundException('El token es invalido');
        
        const user = await this.userModel.findById(tokenExist.user);
        user.confirmed = true;

        await Promise.allSettled([ user.save(), tokenExist.deleteOne()])

        return new ResponseEntity<User>()
            .setRecords(user)
            .setTitle('confirmAccount')
            .setMessage('Usuario verificado correctamente')
            .setStatus(201)
            .build();
    }
}
