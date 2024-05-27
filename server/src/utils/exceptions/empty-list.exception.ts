import { HttpStatus, HttpException } from '@nestjs/common';

export class EmptyListException extends HttpException {
    constructor(type: string) {
        let message = `The list of ${type} is empty`
        super(message, HttpStatus.NOT_FOUND);
    }
}