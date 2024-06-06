import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RegisterTokensModule } from './register-tokens/register-tokens.module';
import { MailModule } from './mail/mail.module';
import { EventMailModule } from './mail/event-mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(), 
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    ProjectsModule,
    TasksModule,
    UsersModule,
    AuthModule,
    RegisterTokensModule,
    MailModule,
    EventMailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
