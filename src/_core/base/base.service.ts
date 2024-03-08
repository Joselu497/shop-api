import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAndCountOptions, FindOptions } from 'sequelize';

@Injectable()
export abstract class BaseService<T> {
  constructor(protected model: any) {}

  private modelName = this.model.name;

  async findAll(
    options: FindOptions<any> | Omit<FindAndCountOptions<any>, 'group'>,
    pagination = true,
  ): Promise<{ rows: T[]; count: number } | T[]> {
    return pagination
      ? this.model.findAndCountAll(options)
      : this.model.findAll();
  }

  async findOne(id: number): Promise<T> {
    const data = await this.model.findByPk(id);

    if (!data) {
      throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
    }
    return data;
  }

  async remove(id: number): Promise<void> {
    const model = await this.model.findByPk(id);

    if (!model) {
      throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
    }

    return model.destroy();
  }
}
