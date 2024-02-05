import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsBooleanString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ObjectIdRegex } from '../constants/objectId-regex.constant';
import { ShowOptionEnum } from '../enums/show-option.enum';

export class findByIdDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  id: string;
}

export class RepositoryOptionsDto {
  show?: ShowOptionEnum;
  hardDelete?: boolean;
  project?: Record<string, 0 | 1>;
}

export class addSortDto {
  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsBoolean()
  @Transform((param) => {
    if ([true, 'true', 1, '1'].includes(param.value)) return true;
    else return false;
  })
  asc?: boolean;
}

export class addLimitDto {
  @IsOptional()
  @Max(100, { message: 'حداکثر تعداد نمایش ۱۰۰ می باشد' })
  @Min(1, { message: 'حداقل تعداد نمایش ۱ می باشد' })
  @IsNumber({}, { message: 'تعداد باید عدد ارسال شود' })
  @Transform((param) => {
    const value = +param.value;
    if (Number.isNaN(value)) return '';
    return value;
  })
  limit?: number;
}

export class addPaginationDto {
  @IsOptional()
  @Min(1, { message: 'حداقل تعداد نمایش ۱ می باشد' })
  @IsNumber({}, { message: 'تعداد باید عدد ارسال شود' })
  @Transform((param) => {
    const value = +param.value;
    if (Number.isNaN(value)) return '';
    return value;
  })
  page?: number;
}

export class addSearchDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'حداقل طول فیلد جست و جو ۱ می باشد' })
  @MaxLength(32, { message: 'حداکثر طول فیلد جست و جو ۳۲ می باشد' })
  searchKey?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'حداقل طول مقدار جست و جو ۱ می باشد' })
  @MaxLength(32, { message: 'حداکثر طول مقدار جست و جو ۳۲ می باشد' })
  searchValue?: string;
}

export class addListOptionsDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  @Transform((param) => {
    if ([true, 'true', 1, '1'].includes(param.value)) return true;
    else return false;
  })
  asc?: boolean;

  @ApiProperty({ type: Number })
  @IsOptional()
  @Max(100, { message: 'حداکثر تعداد نمایش ۱۰۰ می باشد' })
  @Min(1, { message: 'حداقل تعداد نمایش ۱ می باشد' })
  @IsNumber({}, { message: 'تعداد باید عدد ارسال شود' })
  @Transform((param) => {
    const value = +param.value;
    if (Number.isNaN(value)) return '';
    return value;
  })
  limit?: number;

  @ApiProperty({ type: Number })
  @IsOptional()
  @Min(1, { message: 'حداقل تعداد نمایش ۱ می باشد' })
  @IsNumber({}, { message: 'تعداد باید عدد ارسال شود' })
  @Transform((param) => {
    const value = +param.value;
    if (Number.isNaN(value)) return '';
    return value;
  })
  page?: number;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'حداقل طول فیلد جست و جو ۱ می باشد' })
  @MaxLength(32, { message: 'حداکثر طول فیلد جست و جو ۳۲ می باشد' })
  searchKey?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'حداقل طول مقدار جست و جو ۱ می باشد' })
  @MaxLength(32, { message: 'حداکثر طول مقدار جست و جو ۳۲ می باشد' })
  searchValue?: string;

  @ApiProperty({ type: Boolean })
  @IsBooleanString()
  @IsOptional()
  showDeleted?: boolean;
}
