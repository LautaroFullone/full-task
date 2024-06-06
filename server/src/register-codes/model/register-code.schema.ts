import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { UserDocument } from "src/users/model/user.schema";

export type RegisterCodeDocument = HydratedDocument<RegisterCode>;

@Schema({ collection: 'register_codes', timestamps: false })
export class RegisterCode {

    @Prop({ required: true, trim: true })
    code: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: UserDocument;

    @Prop({ type: Date, default: Date.now(), expires: "10m" })
    createdAt: Date
}

export const RegisterCodeSchema = SchemaFactory.createForClass(RegisterCode);
