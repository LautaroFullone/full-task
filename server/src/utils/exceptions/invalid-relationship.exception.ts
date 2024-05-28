import { HttpStatus, HttpException } from '@nestjs/common';

export class InvalidRelationshipException extends HttpException {
    constructor() {
        super('Ivalid relationship between documents', HttpStatus.BAD_REQUEST);
    }
}