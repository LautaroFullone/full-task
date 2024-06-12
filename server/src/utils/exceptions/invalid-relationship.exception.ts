import { HttpStatus, HttpException } from '@nestjs/common';

export class InvalidRelationshipException extends HttpException {
    constructor() {
        super('Relación invalida entre los documentos', HttpStatus.BAD_REQUEST);
    }
}