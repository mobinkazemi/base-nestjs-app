import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ChangeUserRoleDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  userId: string;
  @ApiProperty({ type: String })
  @IsMongoId()
  roleId: string;
}
