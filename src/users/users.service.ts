import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersDto } from './users.dto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/_core/base/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User)
    protected readonly model: typeof User,
  ) {
    super(model);
  }

  async create(createUserDto: UsersDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    return this.model.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, salt),
      isAdmin: createUserDto.isAdmin,
    });
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
}
