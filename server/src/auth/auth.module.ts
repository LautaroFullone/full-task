import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/model/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RegisterCode, RegisterCodeSchema } from 'src/register-codes/model/register-code.schema';


@Module({
  imports: [
    JwtModule.registerAsync({   //SE HACE DE MANERA ASINCRONICA PARA QUE DE TIEMPO A CARGAR EL .ENV
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }
      }
    }),
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
        { name: RegisterCode.name, schema: RegisterCodeSchema },
      ]
    )
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
