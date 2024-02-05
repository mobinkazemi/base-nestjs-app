import { NotFoundException } from '@nestjs/common';
import { addListOptionsDto } from '../dto/base-repository-dtos.dto';
import { ServiceOptionsDto } from '../dto/service-options.dto';
import { BaseRepository } from '../repository/base.repository';

export abstract class BaseService {
  constructor(private readonly repository: BaseRepository) {}
  async create<T>(
    data: Partial<T>,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<Partial<unknown>> {
    return (await this.repository.create(data)) as T;
  }

  async findOne<T>(
    data: Partial<T>,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<T> {
    const document = await this.repository.findOne(data, serviceOptions);

    if (!document && serviceOptions?.error) {
      throw new NotFoundException(serviceOptions?.errorMessage || undefined);
    }

    return document as T;
  }

  async findAll<T>(
    data: Partial<T>,
    listOptions?: addListOptionsDto,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<Array<Partial<T>>> {
    return (await this.repository.findAll(
      data,
      listOptions,
      serviceOptions,
    )) as T[];
  }

  async update<T>(
    findData: Partial<T>,
    updateData: Partial<T>,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<T> {
    return (await this.repository.update(
      findData,
      updateData,
      serviceOptions,
    )) as T;
  }

  async remove<T>(
    data: Partial<T>,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<void> {
    return await this.repository.remove(data, serviceOptions);
  }

  ////

  abstract createApi<T>(
    data: Partial<T>,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<Partial<T>>;

  abstract findOneApi<T>(
    data: Partial<T>,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<T>;

  abstract findAllApi<T>(
    data: Partial<T>,
    listOptions?: addListOptionsDto,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<Array<T>>;

  abstract updateApi<T>(
    findData: Partial<T>,
    updateData: Partial<T>,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<T>;

  abstract removeApi<T>(
    data: Partial<T>,
    serviceOptions?: ServiceOptionsDto,
  ): Promise<void>;
}
