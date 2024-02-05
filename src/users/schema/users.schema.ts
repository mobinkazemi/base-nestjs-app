import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Base } from '../../database/schema/base.schema';
import { addUserHooks } from '../hook/users.hook';

export type UserDocument = Document & User;

@Schema({ id: true, timestamps: true })
export class User extends Base {
  @Prop({
    // نام
    type: String,
    trim: true,
    required: false,
  })
  firstName?: string;

  @Prop({
    // نام خانوادگی
    type: String,
    trim: true,
    required: false,
  })
  lastName?: string;

  @Prop({
    // شناسه تصویر پروفایل
    type: SchemaTypes.ObjectId,
    required: false,
  })
  profileId?: Types.ObjectId;

  @Prop({
    // رمز عبور
    type: String,
    required: false,
  })
  password: string;

  @Prop({
    // نام کاربری
    type: String,
    trim: true,
    minlength: 4,
    maxlength: 24,
  })
  username: string;
}

let UserSchemaBase = SchemaFactory.createForClass(User);
export const UserSchema = addUserHooks(UserSchemaBase);
