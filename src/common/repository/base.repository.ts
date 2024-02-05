import mongoose, { isValidObjectId, Model } from 'mongoose';
import {
  addLimitDto,
  addListOptionsDto,
  addPaginationDto,
  addSearchDto,
  addSortDto,
  RepositoryOptionsDto,
} from '../dto/base-repository-dtos.dto';
import * as _ from 'lodash';
import { ObjectIdType } from 'src/common/types/types';
export abstract class BaseRepository {
  private model: Model<unknown>;
  constructor(model: Model<unknown>) {
    this.model = model;
  }
  //
  //
  //
  // ABSTRACT FUNCTIONS
  abstract create(
    data: unknown,
    options?: RepositoryOptionsDto,
  ): Promise<unknown>;

  abstract findOne(
    data: Partial<unknown>,
    options?: RepositoryOptionsDto,
  ): Promise<unknown>;

  abstract findAll(
    data?: Partial<unknown>,
    listOptions?: addListOptionsDto,
    options?: RepositoryOptionsDto,
  ): Promise<unknown[]>;

  abstract update(
    findData: Partial<unknown>,
    updateData: Partial<unknown>,
    options?: RepositoryOptionsDto,
  ): Promise<unknown>;

  abstract remove(
    findData: Partial<unknown>,
    options?: RepositoryOptionsDto,
  ): Promise<void>;

  //
  //
  //
  // BASE IMPLEMENTATIONS
  protected async baseFindAll<T>(
    data?: Partial<T> | Record<string, any>,
    listOptions?: addListOptionsDto,
    options?: RepositoryOptionsDto,
  ): Promise<T[]> {
    // ENSURE INCOMING DATA
    data = data ?? {};
    listOptions = listOptions ?? {};

    // DEFINE QUERY
    let query = {};

    if (data.id) {
      query['_id'] = this.convertToObjectId(data.id);
      delete data.id;
    }

    query = {
      ...query,
      ...data,
      deletedAt: null,
    };

    // DEFINE LIST OPTIONS
    const { sort, limit, skip, search } = this.addListOptions(listOptions);

    // DEFINE QUERY OPTIONS
    if (options) {
      query = this.addOptions(query, options);
    }

    const project = options?.project || {};
    // SEARCH AND RETURN DATA
    return await this.model.find({ ...query, ...search }, project, {
      sort,
      limit,
      skip,
    });
  }

  protected async baseCreate<T>(data: Partial<T>): Promise<T> {
    return (await this.model.create(data)).toObject();
  }

  protected async baseFindOne<T>(
    data: Partial<T> | Record<string, any>,
    options?: RepositoryOptionsDto,
  ): Promise<T> {
    // ENSURE INCOMING DATA
    data = data ?? {};

    // DEFINE QUERY
    let query = {};

    if (data.id) {
      query['_id'] = this.convertToObjectId(data.id);
      delete data.id;
    }

    query = {
      ...query,
      ...data,
      deletedAt: null,
    };

    // DEFINE QUERY OPTIONS
    if (options) {
      query = this.addOptions(query, options);
    }

    const project = options?.project || {};

    // SEARCH AND RETURN DATA
    return (await this.model.findOne(query, project))?.toObject();
  }

  protected async baseUpdate<T>(
    findData: Partial<T> | Record<string, any>,
    updateData: Partial<T>,
    options?: RepositoryOptionsDto,
  ): Promise<T> {
    let query = {};

    if (findData['id']) {
      query['_id'] = this.convertToObjectId(findData['id']);
      delete findData['id'];
    }

    query = {
      ...query,
      ...findData,
      deletedAt: null,
    };

    if (options) {
      query = this.addOptions(query, options);
    }

    const project = options?.project || {};

    return await this.model.findOneAndUpdate(query, updateData, {
      new: true,
      projection: project,
    });
  }

  protected async baseRemove<T>(
    findData: Partial<T> | any,
    options?: RepositoryOptionsDto,
  ): Promise<void> {
    if (findData.id) {
      findData._id = this.convertToObjectId(findData.id);
      delete findData.id;
    }

    if (options?.hardDelete) {
      await this.model.deleteOne(findData);
    } else {
      await this.model.updateOne(findData, {
        $set: { deletedAt: Date.now() },
      });
    }
  }

  //
  //
  //
  // LIST FUNCTIONS
  private addSort(data?: addSortDto) {
    const { sort, asc } = data;
    let obj = {};

    let key: string;
    let value: 1 | -1;

    if (sort) key = sort;
    else key = 'createdAt';

    if (asc) value = 1;
    else value = -1;

    obj[key] = value;

    return obj;
  }
  private addLimit(data?: addLimitDto) {
    const { limit } = data;

    return limit || 20;
  }
  private addPagination(data?: addPaginationDto) {
    const { page } = data;

    return page || 1;
  }
  private addSearch(data?: addSearchDto): Record<string, unknown> {
    if (!data?.searchKey && !data?.searchValue) return {};

    return { [data.searchKey]: { $regex: new RegExp(data.searchValue, 'i') } };
  }
  protected addListOptions(data: addListOptionsDto) {
    data = data ?? {};

    const sort = this.addSort(_.pick(data, ['sort', 'asc']));
    const limit = this.addLimit(_.pick(data, ['limit']));
    const page = this.addPagination(_.pick(data, ['page']));
    const skip = (page - 1) * limit;
    const search = this.addSearch(_.pick(data, ['searchKey', 'searchValue']));

    return {
      sort,
      limit,
      skip,
      search,
    };
  }

  //
  //
  //
  // OTHER TOOLS FUNCTIONS
  protected addOptions(data: any, options: RepositoryOptionsDto) {
    if (options.show) {
      switch (options.show) {
        case 'all':
          delete data.deletedAt;
          break;

        case 'removed':
          data.deletedAt = { $ne: null };
          break;
      }
    }

    return data;
  }
  protected convertToObjectId(data: string): ObjectIdType {
    if (typeof data == 'object' && isValidObjectId(data))
      return data as ObjectIdType;

    return new mongoose.Types.ObjectId(data);
  }
}
