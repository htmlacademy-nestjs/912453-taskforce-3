import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {City, UserInterface, UserRole} from '@project/shared/app-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements UserInterface {
  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: false,
  })
  public about: string;

  @Prop({
    required: true,
    type: String,
    enum: City,
  })
  public city: City;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole
  })
  public role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
