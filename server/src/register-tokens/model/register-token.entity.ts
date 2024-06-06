import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDocument } from 'src/users/model/user.schema';

export type RegisterTokenDocument = HydratedDocument<RegisterToken>;

@Schema({ collection:'register_tokens', timestamps: false })
export class RegisterToken {

    @Prop({ required: true, trim: true })
    token: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: UserDocument;

    @Prop({ type: Date, default: Date.now(), expires: "10m" })
    createdAt: Date
}

export const RegisterTokenSchema = SchemaFactory.createForClass(RegisterToken);
