import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsArray,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseSchemaDto } from 'src/database/dto/base.dto';
import { User } from 'src/users/schema/users.schema';

export class UpdateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  lastName?: string;

  // @ApiProperty({type: String})
  // profileId?: Types.ObjectId;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  @IsStrongPassword({ minLength: 8 })
  password: string;

  @ApiProperty({ type: String })
  @IsAlphanumeric()
  @IsOptional()
  @IsString()
  username: string;
}
