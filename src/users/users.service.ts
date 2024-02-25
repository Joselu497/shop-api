import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAndCountOptions, FindOptions } from 'sequelize';
import { UsersDto } from './users.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly model: typeof User,
  ) {}

  async create(createUserDto: UsersDto): Promise<User> {
    return this.model.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      isAdmin: createUserDto.isAdmin,
    });
  }

  async findAll(
    options: FindOptions<any> | Omit<FindAndCountOptions<any>, 'group'>,
    pagination = true,
  ): Promise<{ rows: User[]; count: number } | User[]> {
    return pagination
      ? this.model.findAndCountAll(options)
      : this.model.findAll();
  }

  async findOne(id: number): Promise<User> {
    const data = await this.model.findByPk(id);

    if (!data) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return data;
  }

  async update(id: number, updateUserDto: UsersDto): Promise<User> {
    const model = await this.model.findByPk(id);

    if (!model) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    model.name = updateUserDto.name;
    model.email = updateUserDto.email;
    model.password = updateUserDto.password;
    model.isAdmin = updateUserDto.isAdmin;

    return model.save();
  }

  async remove(id: number): Promise<void> {
    const model = await this.model.findByPk(id);

    if (!model) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return model.destroy();
  }
}
