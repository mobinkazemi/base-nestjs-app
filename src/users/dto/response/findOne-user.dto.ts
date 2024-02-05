import { ObjectIdType } from 'src/common/types/types';
import { User } from '../../../users/schema/users.schema';

export class FindUserResponseDto {
  _id: ObjectIdType;
  username: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<User>) {
    this._id = data._id;
    this.username = data.username;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class userWithoutPasswordDto {
  constructor(thisUser: Partial<User>) {
    if (thisUser) {
      for (let key in thisUser) {
        if (key == 'password') continue;

        this[key] = thisUser[key];
      }
    }
  }
}
