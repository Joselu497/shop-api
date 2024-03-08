import { Injectable, NotFoundException } from '@nestjs/common';
import { SalesDto } from './sales.dto';
import { Sale } from './sales.model';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/_core/base/base.service';

@Injectable()
export class SalesService extends BaseService<Sale> {
  constructor(
    @InjectModel(Sale)
    protected readonly model: typeof Sale,
  ) {
    super(model);
  }

  async create(createSaleDto: SalesDto): Promise<Sale> {
    return this.model.create({
      userId: createSaleDto.userId,
      productId: createSaleDto.productId,
      date: new Date(),
    });
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
}
