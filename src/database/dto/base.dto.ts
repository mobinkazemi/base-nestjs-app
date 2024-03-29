import { OmitType, PickType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import mongoose, { ObjectId, Types } from 'mongoose';
import { ObjectIdOrString } from 'src/common/types/types';
import { Base } from '../schema/base.schema';

export class BaseSchemaDto {
  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  ord?: number;
  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @Transform((param) => new mongoose.Types.ObjectId(param.value))
  pid?: Types.ObjectId;
  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDate()
  @Transform((param) => new Date(param.value))
  createdAt?: Date;
  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDate()
  @Transform((param) => new Date(param.value))
  updatedAt?: Date;
  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDate()
  @Transform((param) => new Date(param.value))
  deletedAt?: Date;
}
