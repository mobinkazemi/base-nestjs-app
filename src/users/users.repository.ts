import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RepositoryOptionsDto,
  addListOptionsDto,
} from '../common/dto/base-repository-dtos.dto';
import { BaseRepository } from '../common/repository/base.repository';
import { FilterRequestUserDto } from './dto/request/filter-user.dto';
import * as _ from 'lodash';
import { UserPartialType } from './types/partial-user.type';
import { User, UserDocument } from './schema/users.schema';

@Injectable()
export class UsersRepository extends BaseRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async findOne<User>(
    data?: UserPartialType,
    options?: RepositoryOptionsDto,
  ): Promise<User> {
    return await this.baseFindOne(data as Partial<User>, options);
  }

  async findAll<User>(
    data?: FilterRequestUserDto,
    listOptions?: addListOptionsDto,
    options?: RepositoryOptionsDto,
  ): Promise<User[]> {
    return await this.baseFindAll(data as Partial<User>, listOptions, options);
  }

  async create<User>(createUserDto: UserPartialType): Promise<User> {
    return await this.baseCreate(createUserDto as Partial<User>);
  }

  async update<User>(
    findData: UserPartialType,
    updateData: UserPartialType,
    options?: RepositoryOptionsDto,
  ): Promise<User> {
    return await this.baseUpdate(
      findData as Partial<User>,
      updateData as Partial<User>,
      options,
    );
  }

  async remove<User>(
    findData: UserPartialType,
    options?: RepositoryOptionsDto,
  ): Promise<void> {
    await this.baseRemove(findData as Partial<User>, options);
  }
}
