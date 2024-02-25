import { Injectable, NotFoundException } from '@nestjs/common';
import { SalesDto } from './sales.dto';
import { Sale } from './sales.model';
import { InjectModel } from '@nestjs/sequelize';
import { FindAndCountOptions, FindOptions } from 'sequelize';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale)
    private readonly model: typeof Sale,
  ) {}

  async create(createSaleDto: SalesDto): Promise<Sale> {
    return this.model.create({
      userId: createSaleDto.userId,
      productId: createSaleDto.productId,
      date: new Date(),
    });
  }

  async findAll(
    options: FindOptions<any> | Omit<FindAndCountOptions<any>, 'group'>,
    pagination = true,
  ): Promise<{ rows: Sale[]; count: number } | Sale[]> {
    return pagination
      ? this.model.findAndCountAll(options)
      : this.model.findAll();
  }

  async findOne(id: number) {
    const data = await this.model.findByPk(id);

    if (!data) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return data;
  }

  async update(id: number, updateSaleDto: SalesDto): Promise<Sale> {
    const model = await this.model.findByPk(id);

    if (!model) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    model.userId = updateSaleDto.userId;
    model.productId = updateSaleDto.productId;
    model.date = updateSaleDto.date;

    return model.save();
  }

  async remove(id: number): Promise<void> {
    const model = await this.model.findByPk(id);

    if (!model) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    return model.destroy();
  }
}
