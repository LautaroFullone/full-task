import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from 'src/users/model/user.schema';

@Module({})
export class EventMailModule {

    constructor(private readonly mailService: MailerService) { }

    @OnEvent('request.registrationCode')
    handleRegistationCodeSending({ user, code }: { user: UserDocument, code: string }) {

        this.mailService.sendMail({
            to: user.email,
            subject: 'FullTask: Verificacion de nueva cuenta',
            template: 'code-template',
            context: {
                name: user.name,
                url: `${process.env.FRONTEND_URL}/auth/confirm-account`,
                code
            }
        }).then(() => {
            console.log('Mail sent successfully');
        }).catch((error) => {
            console.error('Error sending mail:', error);
        });
    }

    @OnEvent('request.passwordCode')
    handlePasswordCodeSending({ user, code }: { user: UserDocument, code: string }) {

        this.mailService.sendMail({
            to: user.email,
            subject: 'FullTask: Reestablecer contraseña',
            template: 'forgot-password-template',
            context: {
                name: user.name,
                url: `${process.env.FRONTEND_URL}/auth/reset-password`,
                code
            }
        }).then(() => {
            console.log('Mail sent successfully');
        }).catch((error) => {
            console.error('Error sending mail:', error);
        });
    }
}
