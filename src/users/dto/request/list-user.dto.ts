import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  username: string;
}
