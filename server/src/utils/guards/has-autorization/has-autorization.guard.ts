import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class HasAutorizationGuard implements CanActivate {

    //acciones validas solo por el manager
    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const [req, _] = context.getArgs();
        const { project, user } = req;

        if(project.manager.toString() !== user._id.toString())
            throw new ForbiddenException('Solo el manager puede realizar esa acción');

        return true;
    }
}
