import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { User, UserDocument } from 'src/users/model/user.schema';
import { ResponseEntity } from 'src/utils/responses';
import { JwtService } from '@nestjs/jwt';
import { compareHash, generateHash } from 'src/utils/scripts/hashHandling';
import { generateRegisterCode } from 'src/utils/scripts/registerCodeGenerator';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RegisterCode } from 'src/register-codes/model/register-code.schema';

type Token = {
    token: string
}

@Injectable()
export class AuthService {
    
    constructor(private readonly jwtService: JwtService, 
                private readonly eventEmitter: EventEmitter2,
                @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
                @InjectModel(RegisterCode.name) private readonly registerCodeModel: Model<RegisterCode>) { }
    
    async register(registerData: RegisterAuthDto): Promise<ResponseEntity<User>> { 
       
        const userExist = await this.userModel.findOne({ email: registerData.email });
        if (userExist) throw new ConflictException('Ya existe un usuario registrado con ese email');
        
        const cryptPass = await generateHash(registerData.password) 
        
        const newUser = await this.userModel.create({ ...registerData, password: cryptPass })
        
        const registerCode = await this.registerCodeModel.create({ code: generateRegisterCode(), user: newUser })

        this.eventEmitter.emit('user.register', { user: newUser, code: registerCode.code})

        return new ResponseEntity<User>()
            .setRecords(newUser)
            .setTitle('handleRegister')
            .setMessage('Usuario registrado correctamente, revise su correo!')
            .setStatus(201)
            .build();
    }

    async login(loginData: LoginAuthDto): Promise<ResponseEntity<Token>> {
        
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

    async confirmAccount(registerCode: string): Promise<ResponseEntity<User>> {
        
        const codeExist = await this.registerCodeModel.findOne({ code: registerCode });
        if (!codeExist) throw new NotFoundException('El codigo es invalido');
        
        const user = await this.userModel.findById(codeExist.user);
        user.confirmed = true;

        await Promise.allSettled([user.save(), codeExist.deleteOne()])

        return new ResponseEntity<User>()
            .setRecords(user)
            .setTitle('confirmAccount')
            .setMessage('Usuario verificado correctamente')
            .setStatus(201)
            .build();
    }

    async requestRegisterCode(email: string): Promise<ResponseEntity<User>> {

        const userExist = await this.userModel.findOne({ email });
        if (!userExist) throw new NotFoundException('El usuario no existe');
        if (userExist.confirmed) throw new ForbiddenException('El usuario ya está validado');

        const registerCode = await this.registerCodeModel.create({ code: generateRegisterCode(), user: userExist })

        this.eventEmitter.emit('user.register', { user: userExist, code: registerCode.code })

        return new ResponseEntity<User>()
            .setRecords(userExist)
            .setTitle('requestConfimationCode')
            .setMessage('Se envió un nuevo codigo, revise su correo!')
            .setStatus(201)
            .build();
    }
}
