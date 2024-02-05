import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
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
  @IsStrongPassword({ minLength: 8 })
  password: string;

  @ApiProperty({ type: String })
  @IsAlphanumeric()
  @IsString()
  username: string;
}
