import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './schema/users.schema';
import { UsersRepository } from './users.repository';
import { ChangeUserRoleDto } from './dto/request/change-user-role.dto';
import { addListOptionsDto } from 'src/common/dto/base-repository-dtos.dto';
import * as bcrypt from 'bcrypt';
import { ServiceOptionsDto } from 'src/common/dto/service-options.dto';
import { UserMessagesEnum } from './enums/messages.enum';
import { UserPartialType } from './types/partial-user.type';
import { BaseService } from 'src/common/services/base.service';
import { ShowOptionEnum } from 'src/common/enums/show-option.enum';
import { generateRandomNumber } from 'src/common/functions/generateRanNumber.function';
@Injectable()
export class UsersService extends BaseService {
  constructor(private readonly userRepository: UsersRepository) {
    super(userRepository);
  }
  async createApi<User>(
    data: UserPartialType,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<User> {
    if (data.username) {
      const duplicateUsername = await this.userRepository.findOne(
        {
          username: data.username,
        },
        { show: ShowOptionEnum.all },
      );
      if (duplicateUsername && serviceOptions?.error) {
        throw new ConflictException('نام کاربری قبلا استفاده شده است');
      }
      if (duplicateUsername) return;
    } else {
      data.username = 'User_'.concat(String(generateRandomNumber(10)));
    }

    const result = await this.userRepository.create<User>(data);

    return result;
  }

  async findAllApi<User>(
    data: UserPartialType,
    listOptions?: addListOptionsDto,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<Array<User>> {
    const result: User[] = await this.userRepository.findAll(
      data,
      listOptions,
      serviceOptions,
    );
    return result;
  }

  async findOneApi<User>(
    data: UserPartialType,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<User> {
    const result: User = await this.userRepository.findOne(
      data,
      serviceOptions,
    );

    if (!result && serviceOptions?.error) {
      throw new NotFoundException(UserMessagesEnum.USER_NOT_FOUND);
    }

    return result;
  }

  async updateApi<User>(
    findData: UserPartialType,
    updateData: UserPartialType,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<User> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 8);
    }

    const result = await this.userRepository.update<User>(
      findData,
      updateData,
      serviceOptions,
    );

    return result;
  }

  async removeApi<User>(
    data: UserPartialType,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<void> {
    await this.userRepository.remove(data);
  }
}
