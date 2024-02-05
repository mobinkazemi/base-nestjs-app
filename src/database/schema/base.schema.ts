import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { SchemaTypes, Types } from 'mongoose';
import { ObjectIdOrString, ObjectIdType } from 'src/common/types/types';
@Schema({ id: true, timestamps: true })
export abstract class Base {
  _id: Types.ObjectId;

  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId })
  pid: Types.ObjectId;

  @ApiProperty({ type: Number })
  @Prop({ type: Number })
  ord: number;

  @ApiProperty({ type: Date })
  @Prop({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  @Prop({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Date })
  @Prop({ type: Date })
  deletedAt: Date;
}
