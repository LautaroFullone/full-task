import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from 'src/dto/login-auth.dto';
import { RegisterAuthDto } from 'src/dto/register-auth.dto';

@Injectable()
export class AuthService {

    public async handleLogin(userBody: LoginAuthDto) {
        // const userExist = await this.userModel.findOne({ email: userBody.email });

        // if (!userExist) throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);

        // const check = await compareHash(userBody.password, userExist.password)
        // if (!check) throw new HttpException('Contraseña incorrecta', HttpStatus.FORBIDDEN);

        // const { password, ...userWithOutPass } = userExist.toObject();

        // //esto es lo que mando a codificar al token, info a la que accedo dsp en jwt.strategy !!
        // const payload = {
        //     id: userWithOutPass._id,
        // }

        // const token = this.jwtService.sign(payload)

        // const loginData = {
        //     token,
        //     user: userWithOutPass
        // }

        // //enviar evento de email
        // this.eventEmitter.emit('user.login', loginData)

        // return loginData
    }

    /**
     * Registrar un usuario
     * @param userBody 
     * @returns 
     */
    public async handleRegister(userBody: RegisterAuthDto) {
        // const { password, ...user } = userBody;

        // const userParse = {
        //     ...user,
        //     password: await generateHash(password)
        // }

        // const newUser = await this.userModel.create(userParse)

        // //enviar evento de email
        // this.eventEmitter.emit('user.register', newUser)

        // return newUser;
    }
}
