import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginAuthDto } from 'src/dto/login-auth.dto';
import { RegisterAuthDto } from 'src/dto/register-auth.dto';
import { User, UserDocument } from 'src/users/model/user.schema';
import { ResponseEntity } from 'src/utils/responses';
import { JwtService } from '@nestjs/jwt';
import { compareHash, generateHash } from 'src/utils/bcrypt/hashHandling';

type Token = {
    token: string
}

@Injectable()
export class AuthService {
    
    constructor(private readonly jwtService: JwtService, 
                @InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }
    

    async handleRegister(registerData: RegisterAuthDto): Promise<ResponseEntity<User>> { 
       
        const userExist = await this.userModel.findOne({ email: registerData.email });
        if (userExist) throw new ConflictException('Ya existe un usuario registrado con ese email');
        
        const cryptPass = await generateHash(registerData.password)
        
        const newUser = await this.userModel.create({ ...registerData, password: cryptPass })

        return new ResponseEntity<User>()
            .setRecords(newUser)
            .setTitle('handleRegister')
            .setMessage('Usuario registrado correctamente')
            .setStatus(201)
            .build();
    }

    public async handleLogin(loginData: LoginAuthDto) {
        
        const userExist = await this.userModel.findOne({ email: loginData.email });
        if (!userExist) throw new NotFoundException('El usuario no existe');

        const check = await compareHash(loginData.password, userExist.password)
        if (!check) throw new ForbiddenException('Contraseña incorrecta');

        const { password, ...userWithOutPass } = userExist.toObject();

        //esto es lo que mando a codificar al token, info a la que accedo dsp en jwt.strategy !!
        const payload = {
            id: userWithOutPass._id,
        }

        const token = this.jwtService.sign(payload)

        return new ResponseEntity<Token>()
            .setRecords({ token })
            .setTitle('handleRegister')
            .setMessage('Sesion iniciada correctamente')
            .setStatus(201)
            .build();
    }
}
