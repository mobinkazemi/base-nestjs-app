import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { userWithoutPasswordDto } from '../dto/response/findOne-user.dto';
import { User } from '../schema/users.schema';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import {
  addListOptionsDto,
  findByIdDto,
} from 'src/common/dto/base-repository-dtos.dto';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { ResponseAfterCreateDto } from 'src/common/dto/response-after-create.dto';
import { FindUserDto } from '../dto/request/list-user.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() data: CreateUserDto) {
    const result = await this.usersService.createApi(data, {
      error: true,
    });

    return new ResponseAfterCreateDto(result);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiBody({ type: findByIdDto })
  @Delete(':id')
  async remove(@Param() data: findByIdDto) {
    return await this.usersService.removeApi<User>(
      { id: data.id },
      { error: true },
    );
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update user' })
  @Patch(':id')
  async update(
    @Param() findData: findByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.updateApi(findData, updateUserDto, {
      project: { password: 0 },
    });
    return new userWithoutPasswordDto(user as User);
  }

  @ApiOperation({ summary: 'Get user list' })
  @Get()
  async findAll(
    @Query() listOptions: addListOptionsDto,
    @Query() data: FindUserDto,
  ): Promise<Array<Partial<User>>> {
    let result = await this.usersService.findAllApi<User>(data, listOptions, {
      project: { password: 0 },
    });

    return result;
  }

  @ApiOperation({ summary: 'Get user info' })
  @Get(':id')
  async findOne(@Param() data: findByIdDto) {
    const result = await this.usersService.findOneApi<User>(data, {
      error: true,
      project: { password: 0 },
    });

    return result;
  }
}
