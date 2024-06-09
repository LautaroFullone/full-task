import { IsEmail, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class IdAuthDto {

    @IsNotEmpty()
    id: Types.ObjectId

}