import { HttpStatus, HttpException } from '@nestjs/common';

export class InvalidActionException extends HttpException {
    constructor() {
        super('Ivalid action', HttpStatus.BAD_REQUEST);
    }
}